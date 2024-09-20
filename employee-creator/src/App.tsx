import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateEmployeePage from "./pages/CreateEmployeePage/CreateEmployeePage";
import EmployeesPage from "./pages/EmployeesPage/EmployeesPage";
import EditEmployeePage from "./pages/EditEmployeePage/EditEmployeePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeesPage />} />
        <Route path="/add-employee" element={<CreateEmployeePage />} />
        <Route path="/employee/:id/edit" element={<EditEmployeePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
