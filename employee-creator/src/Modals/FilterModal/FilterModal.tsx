import Modal from "react-modal";
import styles from "./FilterModal.module.scss";

interface FilterModalProps {
  openFilterModal: boolean;
  closeModal: () => void;
  onStatusChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilter: () => void;
  status?: string;
}

const FilterModal = ({
  openFilterModal,
  closeModal,
  status,
  handleFilter,
  onStatusChange,
}: FilterModalProps) => {
  return (
    <Modal
      isOpen={openFilterModal}
      onRequestClose={closeModal}
      className={styles.filterModal}
      overlayClassName={styles.filterModalOverlay}
      contentLabel="Employee Status Filter"
      ariaHideApp={false} // Required to avoid accessibility warnings
    >
      <h2>Filter Employees by Status</h2>
      <form className={styles.filterContent}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            value=""
            name="employeeStatus"
            checked={status === ""}
            onChange={onStatusChange}
          />
          All
        </label>

        <label className={styles.radioLabel}>
          <input
            type="radio"
            value="Permanent"
            name="employeeStatus"
            checked={status === "Permanent"}
            onChange={onStatusChange}
          />
          Permanent
        </label>

        <label className={styles.radioLabel}>
          <input
            type="radio"
            value="Contract"
            name="employeeStatus"
            checked={status === "Contract"}
            onChange={onStatusChange}
          />
          Contract
        </label>

        <label className={styles.radioLabel}>
          <input
            type="radio"
            value="Casual"
            name="employeeStatus"
            checked={status === "Casual"}
            onChange={onStatusChange}
          />
          Casual
        </label>
      </form>

      <div className={styles.filterModalActions}>
        <button onClick={closeModal} className={styles.cancelBtn}>
          Cancel
        </button>
        <button onClick={handleFilter} className={styles.confirmBtn}>
          Apply Filter
        </button>
      </div>
    </Modal>
  );
};

export default FilterModal;
