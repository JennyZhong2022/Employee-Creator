import Modal from "react-modal";
import styles from "./FilterModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface FilterModalProps {
  openFilterModal: boolean;
  closeModal: () => void;
  name: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  status: string;
  onStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  basis: string;
  onBasisChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilter: () => void;
}

const FilterModal = ({
  openFilterModal,
  closeModal,
  name,
  onNameChange,
  status,
  onStatusChange,
  basis,
  onBasisChange,
  handleFilter,
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
      <button onClick={closeModal} className={styles.closeButton}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h2 className={styles.modalTitle}>Filters</h2>

      <form
        className={styles.filterForm}
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          handleFilter();
        }}
      >
        {/* Name Filter */}
        <div className={styles.searchForm}>
          <label htmlFor="filter-name">Name:</label>
          <input
            id="filter-name"
            type="text"
            value={name}
            onChange={onNameChange}
            className={styles.searchInput}
            placeholder="Enter employee name"
          />
        </div>

        {/* Employment Status Filter */}
        <div className={styles.filterSection}>
          <h4>Employment Status</h4>
          <div className={styles.filterContent}>
            <label className={styles.radioLabel} htmlFor="status-all">
              <input
                type="radio"
                id="status-all"
                value=""
                name="employeeStatus"
                checked={status === ""}
                onChange={onStatusChange}
              />
              All Status
            </label>

            <label className={styles.radioLabel} htmlFor="status-permanent">
              <input
                type="radio"
                id="status-permanent"
                value="Permanent"
                name="employeeStatus"
                checked={status === "Permanent"}
                onChange={onStatusChange}
              />
              Permanent
            </label>

            <label className={styles.radioLabel} htmlFor="status-contract">
              <input
                type="radio"
                id="status-contract"
                value="Contract"
                name="employeeStatus"
                checked={status === "Contract"}
                onChange={onStatusChange}
              />
              Contract
            </label>
          </div>
        </div>

        {/* Employment Basis Filter */}
        <div className={styles.filterSection}>
          <h4>Employment Basis</h4>
          <div className={styles.filterContent}>
            <label className={styles.radioLabel} htmlFor="basis-all">
              <input
                type="radio"
                id="basis-all"
                value=""
                name="employmentBasis"
                checked={basis === ""}
                onChange={onBasisChange}
              />
              All Basis
            </label>

            <label className={styles.radioLabel} htmlFor="basis-full-time">
              <input
                type="radio"
                id="basis-full-time"
                value="Full-Time"
                name="employmentBasis"
                checked={basis === "Full-Time"}
                onChange={onBasisChange}
              />
              Full-Time
            </label>

            <label className={styles.radioLabel} htmlFor="basis-part-time">
              <input
                type="radio"
                id="basis-part-time"
                value="Part-Time"
                name="employmentBasis"
                checked={basis === "Part-Time"}
                onChange={onBasisChange}
              />
              Part-Time
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.filterModalActions}>
          <button type="submit" className={styles.confirmBtn}>
            Apply Filter
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FilterModal;
