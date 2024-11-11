// submitCode.ts
const submitCode = async (language: string, code: string, input: string) => {
    const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true&fields=*';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '3faef97062mshfdb29d1091c25e7p10a0abjsnacde984bfa45', // Replace with your RapidAPI key
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            language_id: getLanguageId(language),
            source_code: btoa(code),
            stdin: btoa(input)
        }),
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (data.stderr) {
            return `Error: ${atob(data.stderr)}`;
        }
        return data.stdout ? atob(data.stdout) : 'No output.';
    } catch (error) {
        return `Error: ${error}`;
    }
};

const getLanguageId = (language: string): number => {
    switch (language) {
        case 'c': return 50;
        case 'cpp': return 54;
        case 'javascript': return 63;
        default: return 63; // default to JavaScript if language is unknown
    }
};

export default submitCode;
