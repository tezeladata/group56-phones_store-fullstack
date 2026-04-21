import {writeFile} from "fs/promises";

const WriteFile = async (DB, data) => {
    try {
        await writeFile(DB, JSON.stringify(data), "utf8");
        return {message: "Data saved successfully"}
    } catch(err) {
        return {err: err.message}
    }
};

export default WriteFile;