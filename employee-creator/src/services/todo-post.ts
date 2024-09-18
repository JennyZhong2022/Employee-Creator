// import { EmployeeFormData } from "../components/EmployeeForm/schema";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

export interface EmployeeResponse {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  mobile: string;
  employeeStatus: string;
  startDate: string | null;
  finishDate: string | null;
  ongoing: boolean;
  timeBasis: string;
  hoursPerWeek: number;
}

export const getAllEmployees = async () => {
  const response = await fetch(baseURL + "/employees");
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as EmployeeResponse[];
};

// export const createEmployee = async (data: EmployeeFormData) => {
//   const response = await fetch(baseURL + "/employees", {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Failed to fetch");
//   }
//   return (await response.json()) as EmployeeResponse;
// };

export const getEmployeeById = async (id: number) => {
  const response = await fetch(baseURL + `/employees/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as EmployeeResponse;
};

// export const updateEmployeeById = async (
//   id: number,
//   data: EmployeeFormData
// ) => {
//   const response = await fetch(baseURL + `/employees/${id}`, {
//     method: "PATCH",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Failed to fetch");
//   }
//   return (await response.json()) as EmployeeResponse;
// };

export const deleteEmployeeById = async (id: number) => {
  const response = await fetch(baseURL + `/employees/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return true;
};

export const deleteAllEmployee = async () => {
  const response = await fetch(baseURL + "/employees", {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return true;
};
