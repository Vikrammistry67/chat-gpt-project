const { GoogleGenerativeAI } = require('@google/generative-ai');

// API Key check
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateResponse = async (fullHistory) => {
    try {
        // FIX: Model name strictly with 'models/' prefix for some SDK versions
        const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

        if (!fullHistory || fullHistory.length === 0) throw new Error("History empty");

        // Aakhri message prompt nikalna
        const lastMessage = fullHistory.pop();
        const userPrompt = lastMessage.parts[0].text;

        const chat = model.startChat({
            history: fullHistory,
        });

        const result = await chat.sendMessage(userPrompt);
        const response = await result.response;
        return response.text();

    } catch (error) {
        console.error("Gemini Production Error:", error.message);
        // User ko crash nahi, fallback message dikhao
        return "AI is temporarily unavailable. Please try again.";
    }
};

const generateVectors = async (content) => {
    try {
        // Gemini Embedding Model
        const model = genAI.getGenerativeModel({ model: "models/embedding-001" });

        const result = await model.embedContent({
            content: { parts: [{ text: content }] },
            taskType: "RETRIEVAL_DOCUMENT",
            outputDimensionality: 768
        });

        return result.embedding.values;
    } catch (error) {
        console.error("Vector Generation Error:", error.message);
        throw error;
    }
};

module.exports = { generateResponse, generateVectors };