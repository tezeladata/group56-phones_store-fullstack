import {readFile} from "fs/promises";

const ReadFile = async DB => {
    try {
        const data = await readFile(DB, "utf8");
        const result = JSON.parse(data)
        return result
    } catch(err) {
        return {err: err.message}
    }
};

export default ReadFile;