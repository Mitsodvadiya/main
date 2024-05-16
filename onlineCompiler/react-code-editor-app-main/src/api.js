import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";
import { useState, version } from "react";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode) => {
  if(language == "Motoko"){
    console.log("enter..")
    const response = await axios.post("http://localhost:3000/api/motoko",{code:sourceCode,version: LANGUAGE_VERSIONS[language]})
    return {language: 'Motoko', version: '0.11.0', run:{output:response.data.func,stderr:""}};
  }
  if(language == "Solidity"){
    const response = await axios.post("http://localhost:3000/api/solidity",{code:sourceCode,version: LANGUAGE_VERSIONS[language]})
    console.log(response);
  }
  if (language == "Rust") {
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: {
        base64_encoded: 'false',
        fields: '*'
      },
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': 'e3fe4bfd07msh070faeccce7f239p1e749ejsn12aa15d7738b',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      data: {
        language_id: 73,
        source_code: sourceCode,
        stdin: 'SnVkZ2Uw'
      }
    };
    console.log(options);
    try {
      const response = await axios.request(options);
      console.log(response.data);
      const options2 = {
        method: 'GET',
        url: `https://judge0-ce.p.rapidapi.com/submissions/${response.data.token}?base64_encoded=false`,
        params: {
          base64_encoded: 'false',
          fields: '*'
        },
        headers: {
          'X-RapidAPI-Key': 'e3fe4bfd07msh070faeccce7f239p1e749ejsn12aa15d7738b',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      };
      console.log(options2.url)
      try {
        const mainresponse = await axios.request(options2);
        console.log({language: 'Rust', version: '0.11.0', run:mainresponse.data.stdout});
        return {language: 'Rust', version: '0.11.0', run:{output:mainresponse.data.stdout,stderr:mainresponse.data.stderr}};
      } catch (error) {
        console.error(error);
      }
      
    } catch (error) {
      console.error(error);
    }
  }
  else {
    const response = await API.post("/execute", {
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: sourceCode,
        },
      ],
    });
    console.log(response.data);
    return response.data;
  }
};
