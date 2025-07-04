import Container from "./components/Container";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentDetails from "./pages/StudentDetails";
import Dashboard1 from "./components/Dashboard1";

function App() {
  return (
    <Router>
      <Container>
        <h1 className="text-3xl font-bold text-blue-600 ml-150">
          CODEFORCES-REMAINDER
        </h1>

        <Routes>
          <Route path="/" element={<Dashboard1 />} />
          <Route path="/student/:id/details" element={<StudentDetails />} />
        </Routes>
      </Container>
    </Router>
  );
}
export default App;