import * as z from "zod";

const monthEnum = z.enum([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);

export const schema = z
  .object({
    firstName: z.string().min(2, "Please enter at least 2 character(s)"),
    middleName: z.string().optional(),
    lastName: z.string().min(2, "Please enter at least 2 character(s)"),
    email: z.string().email("Invalid email address"),
    mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
    address: z.string().min(2, "Address must be at least 2 characters long"),
    employeeStatus: z.enum(["Permanent", "Contract", "Casual"]),
    startDay: z.number().min(1).max(31),
    startMonth: monthEnum,
    startYear: z.number().min(1900),
    finishDay: z.number().min(1).max(31).nullable().optional(),
    finishMonth: monthEnum.nullable().optional(),
    finishYear: z.number().min(1900).nullable().optional(),
    onGoing: z.boolean().optional(),
    employmentBasis: z.enum(["Full-time", "Part-time"]),
    hoursPerWeek: z.number().min(1).max(80),
  })
  .refine(
    (data) => {
      if (data.onGoing) {
        return true;
      }
      return (
        data.finishDay !== null &&
        data.finishMonth !== null &&
        data.finishYear !== null
      );
    },
    {
      message: "Finish date is required unless the employment is ongoing.",
      path: ["finishDay", "finishMonth", "finishYear"],
    }
  );

export type EmployeeFormData = z.infer<typeof schema>;
