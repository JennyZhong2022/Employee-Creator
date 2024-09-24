import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateEmployeePage from "./pages/CreateEmployeePage/CreateEmployeePage";
import EmployeesPage from "./pages/EmployeesPage/EmployeesPage";
import EditEmployeePage from "./pages/EditEmployeePage/EditEmployeePage";
import { store } from "./Redux/store";
import { Provider } from "react-redux";

// import SearchQueryContextProvider from "./context/SearchQueryContextProvider";

function App() {
  return (
    <BrowserRouter>
      {/* <SearchQueryContextProvider> */}
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<EmployeesPage />} />
          <Route path="/add-employee" element={<CreateEmployeePage />} />
          <Route path="/employee/:id/edit" element={<EditEmployeePage />} />
        </Routes>
      </Provider>
      {/* </SearchQueryContextProvider> */}
    </BrowserRouter>
  );
}

export default App;
