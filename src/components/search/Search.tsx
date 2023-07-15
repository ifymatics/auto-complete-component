import { ChangeEvent, FC } from "react";
import styles from "./Search.module.css";

interface SearchProp {
  value: string;
  setSearchValue: (value: string) => void;

  handleSearchInputFocus: (value: boolean) => void;
}
const Search: FC<SearchProp> = ({
  handleSearchInputFocus,
  setSearchValue,
  value,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value.trim());
  };
  return (
    <div className={styles.search}>
      <input
        className={styles.search}
        type="text"
        value={value}
        placeholder="Search"
        onChange={handleChange}
        onFocus={() => handleSearchInputFocus(true)}
      />
    </div>
  );
};

export default Search;
