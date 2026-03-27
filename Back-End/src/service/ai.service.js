const { GoogleGenerativeAI } = require('@google/generative-ai');

// Render par check karein ki GEMINI_API_KEY sahi set hai
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateResponse = async (content) => {
    try {
        // Latest stable model for 2026
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(content);
        return result.response.text();
    } catch (error) {
        console.error("AI Response Error:", error.message);
        return "System is busy, please try again.";
    }
};

const generateVectors = async (content) => {
    try {
        // EXACT Model Name: 'gemini-embedding-001'
        const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

        const result = await model.embedContent({
            content: { parts: [{ text: content }] },
            taskType: "RETRIEVAL_DOCUMENT",
            // IMPORTANT: Naye model ka default 3072 hai. 
            // Agar aapka Pinecone 768 hai, toh ye line bilkul mat hatana:
            outputDimensionality: 768
        });

        return result.embedding.values;
    } catch (error) {
        console.error("Vector Generation Error:", error.message);
        throw error;
    }
}

module.exports = { generateResponse, generateVectors };