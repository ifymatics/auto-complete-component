import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import SuggestionsList from "./components/suggestionsList/SuggestionsList";
import Search from "./components/search/Search";
import mockData from "./mockData.json";

function App() {
  const [value, setValue] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const autocompleteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to filter the cities based on the search input value
    const filterCities = async () => {
      const data = mockData.cityNames.filter((option: string) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(data);
      fetch("");
    };

    // Call the filterCities function whenever the search input value changes
    filterCities();
  }, [value]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Close the suggestions dropdown if clicked outside of the autocomplete container
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    // Add event listener for outside clicks to close the suggestions dropdown
    document.addEventListener("click", handleOutsideClick);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const onHandleSearchInputChange = async (value: string) => {
    // Update the search input value
    setValue(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Set the selected suggestion as the search input value and close the suggestions dropdown
    setValue(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className={styles.App}>
      <div ref={autocompleteRef}>
        <Search
          setSearchValue={onHandleSearchInputChange}
          showSuggestions={setShowSuggestions}
          value={value}
        />
        {showSuggestions && suggestions.length > 0 && (
          <SuggestionsList
            searchValue={value}
            suggestions={suggestions}
            onClick={handleSuggestionClick}
          />
        )}
      </div>
    </div>
  );
}

export default App;
