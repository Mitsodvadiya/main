import { useState, useEffect } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Output = ({ editorRef, language }) => {
  const [ status,setstatus] = useState(false);
  const [output, setOutput] = useState(null);
  const [display,setdisplay]=useState(false);
  const { id } = useParams()
  const checkOutput = async (stdout) => {
    try {
      const response = await axios.get(`http://localhost:3000/questions/${id}`);
      return response.data.output
    } catch (error) {
      console.error('Error checking output:', error);
      return 'error';
    }
  };
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      const correctoutput = await checkOutput(result.stdout)
      if(correctoutput.trim() == result.stdout.trim()){
        setstatus(true);
      }
      else{
        setstatus(false);
      }
      if (result.stderr == "") {
        setOutput(result.output.split("\n"));
      }
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      // console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
    console.log(status);
    setdisplay(true);
  };

  return (
    <Box w="25%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Text style={{"color":status?"#00af9b":"#ff2d55","display":display?"block":"none"}}>{status?"Completed...":"Failed..."}</Text>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};
export default Output;
