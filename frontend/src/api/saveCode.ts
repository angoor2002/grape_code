import axios from 'axios';

const saveCode = async (codeData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/saveCode', codeData);
        return response.data;
    } catch (error) {
        console.error("Error saving code:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export default saveCode;
