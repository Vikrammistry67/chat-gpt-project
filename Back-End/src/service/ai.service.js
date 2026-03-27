const { GoogleGenerativeAI } = require('@google/generative-ai');

// API Key yahan process.env se lo (Render par variable set hona chahiye)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateResponse = async (content) => {
    // 1. Pehle model select karo
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 2. Phir content generate karo
    const result = await model.generateContent(content);
    const response = await result.response;
    return response.text(); // Text function hai, ise () ke saath call karo
};

const generateVectors = async (content) => {
    // Embedding ke liye bhi getGenerativeModel use hota hai
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" }); // "gemini-embedding-001" bhi chalega

    const result = await model.embedContent(content);
    return result.embedding.values;
};

module.exports = { generateResponse, generateVectors };