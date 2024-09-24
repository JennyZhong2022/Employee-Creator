import Modal from "react-modal";
import styles from "./FilterModal.module.scss";

interface FilterModalProps {
  openFilterModal: boolean;
  closeModal: () => void;
  onStatusChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
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
      <div className={styles.filterContent}>
        <select
          value={status}
          onChange={onStatusChange}
          className={styles.statusSelect}
        >
          <option value="">All</option>
          <option value="Permanent">Permanent</option>
          <option value="Contract">Contract</option>
          <option value="Casual">Casual</option>
        </select>
      </div>
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
