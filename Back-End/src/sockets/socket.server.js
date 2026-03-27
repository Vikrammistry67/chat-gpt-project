const { Server } = require('socket.io');
const cookie = require('cookie');
const JWT = require('jsonwebtoken');
const userModel = require('../models/user.model');
const messageModel = require('../models/message.model');
const { generateResponse, generateVectors } = require('../service/ai.service');
const { createMemory, queryMemory } = require('../service/vector.service');

const initialiseSocketServer = async (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL || 'http://localhost:5173',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        }
    });

    // using socket middlewares ------------>
    // this is for checking user is LoggedInUser | Valid User or Not ------------->

    io.use(async (socket, next) => {
        const cookies = cookie.parse(socket.handshake.headers?.cookie || '');
        if (!cookies.token) next(new Error('Authentication ERROR : Token Not Found !'));
        try {
            const decode = JWT.verify(cookies.token, process.env.JWT_SECRET);   // decode = {id , iat};
            const user = await userModel.findById(decode.id);
            socket.user = user;
            next();
        } catch (error) {
            next(new Error('Authentication ERROR : Token Not Found !'));
        }
    });

    // IO connection
    try {
        io.on('connection', (socket) => {
            console.log(`User Connected : ${socket.user.fullName.firstName}`);
            console.log(`Socket ID : ${socket.id}`);
            console.log('Socket IO connected successfully !');

            // ... existing imports ...

            socket.on('ai-message', async (messagePayload) => {
                try {
                    // 1. User ka message DB mein save karo
                    const message = await messageModel.create({
                        user: socket.user._id,
                        chat: messagePayload.chat,
                        content: messagePayload.content,
                        role: 'user',
                    });

                    // 2. Vectors generate karo (Embedding)
                    const vectors = await generateVectors(messagePayload.content);

                    // 3. RAG: Purani yaadein nikaalo (Vector Search)
                    const rawMemory = await queryMemory({
                        queryVector: vectors,
                        limit: 3
                    });

                    // 4. Background mein memory save karo (Await mat karo response ke liye)
                    createMemory({
                        messageId: message._id,
                        vectors: vectors,
                        metadata: { chat: messagePayload.chat, user: socket.user._id, text: messagePayload.content }
                    }).catch(err => console.error("Vector Save Error:", err));

                    // 5. Recent History fetch karo
                    const userChatHistory = (await messageModel.find({ chat: messagePayload.chat })
                        .sort({ createdAt: -1 }).limit(15).lean()).reverse();

                    const shortTermMemory = userChatHistory.map(chats => ({
                        role: chats.role === 'model' || chats.role === 'ai' ? 'model' : 'user',
                        parts: [{ text: chats.content }],
                    }));

                    // 6. Context inject karo (Gemini rules ke mutabiq)
                    let finalHistory = [...shortTermMemory];

                    if (Array.isArray(rawMemory) && rawMemory.length > 0) {
                        const contextText = rawMemory.map(item => item.metadata?.text || "").filter(t => t !== "").join('\n');

                        // Pehle User context dega, phir Model accept karega (Sequence Maintain karne ke liye)
                        finalHistory.unshift(
                            { role: 'user', parts: [{ text: `Previous Context: ${contextText}` }] },
                            { role: 'model', parts: [{ text: "Context received. I'm ready." }] }
                        );
                    }

                    // 7. AI Response generate karo
                    const response = await generateResponse(finalHistory);

                    // 8. AI Response save aur emit karo
                    const responseMessage = await messageModel.create({
                        user: socket.user._id,
                        chat: messagePayload.chat,
                        content: response,
                        role: 'model'
                    });

                    socket.emit('ai-generated-response', {
                        content: response,
                        chat: messagePayload.chat
                    });

                    // 9. AI ka response bhi Vector DB mein save karo background mein
                    generateVectors(response).then(v => {
                        createMemory({
                            messageId: responseMessage._id,
                            vectors: v,
                            metadata: { chat: messagePayload.chat, user: socket.user._id, text: response }
                        });
                    }).catch(err => console.error("AI Vector Save Error:", err));

                } catch (error) {
                    console.error("Socket Logic Crash:", error);
                    socket.emit('error', { message: "Kuch galat ho gaya, phir se try karein." });
                }
            });
        })
    } catch (error) {
        console.log(`ERROR at socket IO connection ${error}`);
    }

};

module.exports = { initialiseSocketServer };
