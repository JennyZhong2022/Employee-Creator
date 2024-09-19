import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateEmployeePage from "./pages/CreateEmployeePage/CreateEmployeePage";
import EmployeesPage from "./pages/EmployeesPage/EmployeesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeesPage />} />
        <Route path="/add-employee" element={<CreateEmployeePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
