import { schema, EmployeeFormData } from "./schema";
import styles from "./EmployeeForm.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface EmployeeFormProps {
  formType: "create" | "edit";
  employee?: EmployeeFormData;
  onSubmit: (data: EmployeeFormData) => unknown;
}

const EmployeeForm = ({ onSubmit, formType, employee }: EmployeeFormProps) => {
  const {
    reset,
    register,
    watch,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...employee,
      // employmentBasis: employee?.employmentBasis || "Full-time",
      startMonth: "January",
      onGoing: employee?.onGoing || false,
      finishDay: employee?.finishDay || null,
      finishMonth: employee?.finishMonth || null,
      finishYear: employee?.finishYear || null,
    }, // Prefill form with previous data
  });

  const isOngoing = watch("onGoing");

  if (isSubmitSuccessful) reset();

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.section}>
        <h2>Personal information</h2>
        <div className={styles.field}>
          <label htmlFor="firstName">First name</label>
          <input {...register("firstName")} id="firstName" />
          {errors.firstName && (
            <small className={styles.error_text}>
              {errors.firstName.message}
            </small>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="middleName">Middle name (if applicable)</label>
          <input {...register("middleName")} id="middleName" />
        </div>

        <div className={styles.field}>
          <label htmlFor="lastName">Last name</label>
          <input {...register("lastName")} id="lastName" />
          {errors.lastName && (
            <small className={styles.error_text}>
              {errors.lastName.message}
            </small>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Contact details</h2>
        <div className={styles.field}>
          <label htmlFor="email">Email address</label>
          <input {...register("email")} id="email" type="email" />
          {errors.email && (
            <small className={styles.error_text}>{errors.email.message}</small>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="mobile">Mobile number</label>
          <input {...register("mobile")} id="mobile" type="tel" />
          <small>Must be an Australian number</small>
          {errors.mobile && (
            <small className={styles.error_text}>{errors.mobile.message}</small>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="address">Residential address</label>
          <input {...register("address")} id="address" />
          <small>Start typing to search</small>
          {errors.address && (
            <small className={styles.error_text}>
              {errors.address.message}
            </small>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Employee status</h2>
        <div className={styles.field}>
          <label>What is contract type?</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                {...register("employeeStatus")}
                value="Permanent"
              />
              Permanent
            </label>
            <label>
              <input
                type="radio"
                {...register("employeeStatus")}
                value="Contract"
              />
              Contract
            </label>
            <label>
              <input
                type="radio"
                {...register("employeeStatus")}
                value="Casual"
              />
              Contract
            </label>
          </div>
          {errors.employeeStatus && (
            <small className={styles.error_text}>
              {errors.employeeStatus.message}
            </small>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Employment details</h2>

        <div className={styles.field}>
          <label>Start date</label>
          <div className={styles.dateGroup}>
            <div className={styles.dateField}>
              <label htmlFor="startDay">Day</label>
              <input
                {...register("startDay", { valueAsNumber: true })}
                id="startDay"
                type="number"
              />
            </div>
            <div className={styles.dateField}>
              <label htmlFor="startMonth">Month</label>
              <select {...register("startMonth")} id="startMonth">
                <option value="">Select month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            <div className={styles.dateField}>
              <label htmlFor="startYear">Year</label>
              <input
                {...register("startYear", { valueAsNumber: true })}
                id="startYear"
                type="number"
              />
            </div>
          </div>
          {errors.startDay && (
            <small className={styles.error_text}>
              {errors.startDay.message}
            </small>
          )}
          {errors.startMonth && (
            <small className={styles.error_text}>
              {errors.startMonth.message}
            </small>
          )}
          {errors.startYear && (
            <small className={styles.error_text}>
              {errors.startYear.message}
            </small>
          )}
        </div>

        <div className={styles.field}>
          <label>Finish date</label>
          <div className={styles.dateGroup}>
            <div className={styles.dateField}>
              <label htmlFor="finishDay">Day</label>
              <input
                {...register("finishDay", {
                  valueAsNumber: true,
                  setValueAs: (v) =>
                    isOngoing ? null : v === "" ? null : Number(v),
                })}
                id="finishDay"
                type="number"
                disabled={isOngoing}
              />
            </div>
            <div className={styles.dateField}>
              <label htmlFor="finishMonth">Month</label>
              <select
                {...register("finishMonth", {
                  setValueAs: (v) => (isOngoing ? null : v),
                })}
                id="finishMonth"
                disabled={isOngoing}
              >
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            <div className={styles.dateField}>
              <label htmlFor="finishYear">Year</label>
              <input
                {...register("finishYear", {
                  valueAsNumber: true,
                  setValueAs: (v) =>
                    isOngoing ? null : v === "" ? null : Number(v),
                })}
                id="finishYear"
                type="number"
                disabled={isOngoing}
              />
            </div>
          </div>
          {errors.finishDay && (
            <small className={styles.error_text}>
              {errors.finishDay.message}
            </small>
          )}
          {errors.finishMonth && (
            <small className={styles.error_text}>
              {errors.finishMonth.message}
            </small>
          )}
          {errors.finishYear && (
            <small className={styles.error_text}>
              {errors.finishYear.message}
            </small>
          )}
        </div>

        <div className={styles.checkboxField}>
          <input {...register("onGoing")} id="onGoing" type="checkbox" />
          <label htmlFor="onGoing">On going</label>
        </div>

        <div className={`${styles.field} ${styles.questionField}`}>
          <label>Is this on a full-time or part-time basis?</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                id="fullTime"
                {...register("employmentBasis")}
                value="Full-time"
              />
              Full-time
            </label>
            <label>
              <input
                type="radio"
                {...register("employmentBasis")}
                value="Part-time"
              />
              Part-time
            </label>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="hoursPerWeek">Hours per week</label>
          <input
            {...register("hoursPerWeek", { valueAsNumber: true })}
            id="hoursPerWeek"
            type="number"
          />
          {errors.hoursPerWeek && (
            <small className={styles.error_text}>
              {errors.hoursPerWeek.message}
            </small>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <button className={styles.submitBtn} type="submit">
          {formType === "create" ? "Create Profile" : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
