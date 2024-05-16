import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react';
import axios from 'axios';

function QuestionsTable() {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions', error);
      }
    };

    fetchQuestions();
  }, []);

  const getColor = (type) => {
    switch (type) {
      case 'easy':
        return '#00af9b';
      case 'medium':
        return '#ffb800';
      case 'hard':
        return '#ff2d55';
    }
  };

  return (
    <Box overflowX="auto" padding={"50px"}>
      <Table variant="simple" border="1px" borderColor="#333">
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Question</Th>
            <Th>Type</Th>
          </Tr>
        </Thead>
        <Tbody>
          {questions.map((question, index) => (
            <Tr
              key={index}
              cursor="pointer"
              onClick={() => navigate(`/question/${question._id}`)}
            >
              <Td>{++index}</Td>
              <Td>{question.question}</Td>
              <Td style={{"color":getColor(question.type)}}>{question.type}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default QuestionsTable;
