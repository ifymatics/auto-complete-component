import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import SuggestionsList from "./components/suggestionsList/SuggestionsList";
import Search from "./components/search/Search";
import mockData from "./mockData.json";
//import useHttp from "./customHooks/useHttp";

function App() {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [apiData, setApiData] = useState<string[]>(mockData.cityNames);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  //////////////////////////////////////////////
  // To make RESTful api calls to production backend: 1. Uncomment this block of codes
  // 2. Initialize apiData useState with empty array. i.e const [apiData, setApiData] = useState<string[]>([]);

  // const { sendRequest } = useHttp();
  // useEffect(() => {
  //   const filterCities = (data: string[]) => {
  //     setApiData(data);
  //   };

  //   sendRequest(
  //     {
  //       url: `http://localhost:3005/cityNames`,
  //       method: "GET",
  //     },
  //     filterCities
  //   );
  // }, [sendRequest]);
  ////////////////////////////////////////////////////
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const onHandleSearchInputChange = (value: string) => {
    let filteredData: string[] = [];
    if (value.length) {
      filteredData = apiData.filter((name) => {
        const regex = new RegExp(`${value}`, "gi");
        return name.match(regex);
      });
    }

    setValue(value);
    setSuggestions(filteredData);
  };

  const handleSearchInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className={styles.App}>
      <div ref={autocompleteRef}>
        <Search
          setSearchValue={onHandleSearchInputChange}
          handleSearchInputFocus={handleSearchInputFocus}
          value={value}
        />
        {showSuggestions && (
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

//KINDLY UNCOMMENT THIS CODE TO SEE HOW THE FRONTEND CAN MAKE REQUEST TO BACKEND REST APIs
// USING THE CUSTOM HOOK(useHttp)
