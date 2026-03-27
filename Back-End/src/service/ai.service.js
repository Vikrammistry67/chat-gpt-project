const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateResponse = async (fullHistory) => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: "You are a professional AI assistant developed by Vikram. Be concise and helpful."
        });

        if (!fullHistory || fullHistory.length === 0) {
            throw new Error("Chat history is empty.");
        }

        // Aakhri message ko prompt banana hai, baaki ko history
        const lastMessage = fullHistory.pop();
        const userPrompt = lastMessage.parts[0].text;

        const chat = model.startChat({
            history: fullHistory,
        });

        const result = await chat.sendMessage(userPrompt);
        return result.response.text();

    } catch (error) {
        console.error("Gemini Production Error:", error.message);
        throw error; // Controller ise handle karega
    }
};

const generateVectors = async (content) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
        const result = await model.embedContent({
            content: { parts: [{ text: content }] },
            taskType: "RETRIEVAL_DOCUMENT",
            outputDimensionality: 768 // Pinecone compatibility
        });

        return result.embedding.values;
    } catch (error) {
        console.error("Vector Generation Error:", error.message);
        throw error;
    }
};

module.exports = { generateResponse, generateVectors };