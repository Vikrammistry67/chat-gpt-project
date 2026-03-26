const { Pinecone } = require('@pinecone-database/pinecone');

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const gptIndex = pc.Index('cohort-chat-gpt')

const createMemory = async ({ messageId, vectors, metadata }) => {
    try {
        const data = await gptIndex.upsert([{
            id: messageId,
            values: vectors,
            metadata
        }]);
        console.log(`Data sent Successfully To Vector DatBase !`)
    } catch (error) {
        console.log(`ERROR at - Data sent  To Vector DatBase : ${error} `)

    }
}

const queryMemory = async ({ queryVector, limit = 5, metadata }) => {
    const data = await gptIndex.query({
        vector: queryVector,
        topK: limit,
        filter: metadata ? { metadata } : undefined,
        includeMetadata: true,
    });
    return data.matches;
};


module.exports = { createMemory, queryMemory };