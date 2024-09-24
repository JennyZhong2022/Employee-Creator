import React, { useContext, useState } from "react";
import styles from "./SearchBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { SearchQueryContext } from "../../context/SearchQueryContextProvider";

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchQueryContext);
  const [inputValue, setInputValue] = useState<string>("");
  const [employmentStatus, setEmploymentStatus] = useState("");

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    setSearchTerm(inputValue.toLowerCase());

    setInputValue("");
  };

  const handleStatusChange = (e: any): void => {
    setEmploymentStatus(e.target.value);
  };

  console.log("searchTerm", searchTerm);
  // console.log(inputValue);

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <select
        className={styles.statusSelect}
        value={employmentStatus}
        onChange={handleStatusChange}
      >
        <option value="">All</option>
        <option value="Permanent">Permanent</option>
        <option value="Contract">Contract</option>
        <option value="Casual">Casual</option>
      </select>
      <input
        type="text"
        className={styles.searchInput}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search..."
      />

      <button className={styles.searchButton} type="submit">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default SearchBar;
