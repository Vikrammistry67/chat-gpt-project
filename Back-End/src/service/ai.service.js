const { GoogleGenerativeAI } = require('@google/generative-ai');

// Render ke environment variables se API Key uthao
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateResponse = async (content) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(content);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("AI Response Error:", error.message);
        return "AI is currently busy.";
    }
};

const generateVectors = async (content) => {
    try {
        // 'text-embedding-004' ki jagah 'embedding-001' use karo
        const model = genAI.getGenerativeModel({ model: "embedding-001" });

        const result = await model.embedContent(content);
        const embedding = result.embedding;

        return embedding.values; // Direct values return karo
    } catch (error) {
        console.error("Vector Generation Error:", error.message);
        throw error;
    }
}

module.exports = { generateResponse, generateVectors };