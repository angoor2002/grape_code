import React, { useEffect } from 'react';

export const Judge = () => {
  // Sample C++ code in base64 format
  const cppCode = `
    #include <iostream>
    int main() {
        std::string name;
        std::cin >> name;
        std::cout << "Hello, " << name << std::endl;
        return 0;
    }
  `;

  useEffect(() => {
    const submitCode = async () => {
      const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*';
      const options = {
        method: 'POST',
        headers: {
          'x-rapidapi-key': '3faef97062mshfdb29d1091c25e7p10a0abjsnacde984bfa45',
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language_id: 52,
          source_code: btoa(cppCode),
          stdin: btoa('Judge0')
        }),
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const token = result.token; // Get the submission token

        if (token) {
          // Pass token to fetchResult to retrieve output
          await fetchResult(token);
        } else {
          console.error("Token not received from submission.");
        }
      } catch (error) {
        console.error("Error submitting code:", error);
      }
    };

    const fetchResult = async (token: string) => {
      const url = `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '95129200e7msh777d69ea0c3a0e9p1c0b22jsn289cb1d65ca8',
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        },
      };

      try {
        let result = null;

        // Poll until the code execution is completed
        while (!result || result.status.id === 1 || result.status.id === 2) {
          const response = await fetch(url, options);
          result = await response.json();
          console.log("Checking status:", result.status.description);

          if (result.status.id === 3 || result.status.id > 3) {
            break; // Stop polling once execution is done
          }
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retrying
        }
        // const response = await fetch(url, options);
        // result = await response.json();
        console.log("Checking status:", result.status.description);

        // Decode and log the output or error
        if (result.stdout) {
          console.log("Output:", atob(result.stdout));
        }
        if (result.stderr) {
          console.log("Error:", atob(result.stderr));
        }
        console.log("Final Status:", result.status.description);
      } catch (error) {
        console.error("Error retrieving result:", error);
      }
    };

    submitCode();
  }, []);

  return <div>Check the console for the API response.</div>;
};

// export default Judge;
