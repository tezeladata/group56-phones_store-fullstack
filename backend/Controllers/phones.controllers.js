// Utilities
import ReadFile from "../Utils/ReadFile.js"

export const getAllPhones = async (req, res) => {
    try {
        const result = await ReadFile(process.env.PHONES_DB);
        res.status(200).json(result)
    } catch(err) {
        return res.status(err.status).json({err: err.message})
    }
}