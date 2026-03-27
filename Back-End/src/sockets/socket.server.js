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
            origin: 'http://localhost:5173',
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

            socket.on('ai-message', async (messagePayload) => {
                console.log('AI-Message : ', messagePayload.content);

                const message = await messageModel.create({
                    user: socket.user._id,
                    chat: messagePayload.chat,
                    content: messagePayload.content,
                    role: 'user',
                });
                const vectors = await generateVectors(messagePayload.content);
                const memory = await queryMemory({
                    queryVector: vectors,
                    limit: 3,
                    metadata: {},
                })
                try {
                    await createMemory({
                        messageId: message._id,
                        vectors: vectors,
                        metadata: {
                            chat: messagePayload.chat,
                            user: socket.user._id,
                            text: messagePayload.content
                        }
                    })

                } catch (error) {
                    console.log(`ERROR at data sent createMemory to Vector DB : ${error}`)
                };
                const userChatHistory = (await messageModel.find({
                    chat: messagePayload.chat
                }).sort({ createdAt: -1 }).limit(20).lean()).reverse();


                const shortTermMemory = userChatHistory.map((chats) => {
                    return {
                        role: chats.role === 'model' || chats.role === 'ai' ? 'model' : 'user',
                        parts: [{ text: chats.content }],
                    }
                });

                const longTermMomory = [
                    {
                        role: 'user',
                        parts: [{
                            text: `
                            these are some previous messages from the chat, use them to generate response: 
                            ${Array.isArray(memory)
                                    ? memory.map(item => item.metadata?.text || "").filter(t => t !== "").join('\n')
                                    : ""
                                }
                            `
                        }]
                    }
                ];


                console.log(`longTermMomory ---> ${longTermMomory[0].parts}`)
                console.log(`shortTermMemory ---> ${shortTermMemory}`)


                const response = await generateResponse([...longTermMomory, ...shortTermMemory]);

                const responseMessage = await messageModel.create({
                    user: socket.user._id,
                    chat: messagePayload.chat,
                    content: response,
                    role: 'model'
                });

                const responseVectors = await generateVectors(response);

                try {
                    const memory = await createMemory({
                        messageId: responseMessage._id,
                        vectors: responseVectors,
                        metadata: {
                            chat: messagePayload.chat,
                            user: socket.user._id,
                            text: response
                        }
                    })
                } catch (error) {
                    console.log(`ERROR at data getting from Vector DataBase : ${error}`)
                }

                try {
                    socket.emit('ai-generated-response', {
                        content: response,
                        chat: messagePayload.chat
                    });
                    console.log(`AI-Response Data Received Successfully !`)
                } catch (error) {
                    console.log(`ERROR at data receiving from an AI  : ${error}`)
                }
            });
        })
    } catch (error) {
        console.log(`ERROR at socket IO connection ${error}`);
    }

};

module.exports = { initialiseSocketServer };
