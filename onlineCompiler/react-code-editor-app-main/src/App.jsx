import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import { Routes, Route } from 'react-router-dom';
import QuestionsTable from './components/QuestionsTable';
// import QuestionDetail from './components/QuestionDetail';

function App() {
  return (
    <Box minH="100vh" bg="#0f0a19" color="gray.500">
      <Routes>
      <Route path="/" element={<QuestionsTable />} />
      <Route path="/question/:id" element={<CodeEditor />} /> {/* Placeholder for question detail page */}
    </Routes>
    </Box>
  );
}

export default App;
