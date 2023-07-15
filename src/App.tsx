import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import SuggestionsList from "./components/suggestionsList/SuggestionsList";
import Search from "./components/search/Search";
import mockData from "./mockData.json";

function App() {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const autocompleteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filterCities = () => {
      const filteredData = mockData.cityNames.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredData);
    };

    filterCities();
  }, [value]);

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
    setValue(value);
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

// import { useEffect, useRef, useState } from "react";
// import styles from "./App.module.css";
// import SuggestionsList from "./components/suggestionsList/SuggestionsList";
// import Search from "./components/search/Search";
// import mockData from "./mockData.json";
// import useHttp from "./customHooks/useHttp";

// function App() {
//   const [value, setValue] = useState<string>("");
//   const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
//   const [suggestions, setSuggestions] = useState<string[]>([]);

//   const autocompleteRef = useRef<HTMLDivElement>(null);
//   const { sendRequest } = useHttp();

//   useEffect(() => {
//     // Function to filter the cities based on the search input value
//     const filterCities = async (responseData: string[]) => {
//       setSuggestions(responseData);
//     };

//     // Call the filterCities function whenever the search input value changes

//     sendRequest(
//       {
//         url: `http://localhost:3005/cityNames/?search=${value}`,
//         method: "GET",
//       },
//       filterCities.bind(null)
//     );
//   }, [value, sendRequest]);

//   useEffect(() => {
//     const handleOutsideClick = (event: MouseEvent) => {
//       // Close the suggestions dropdown if clicked outside of the autocomplete container
//       if (
//         autocompleteRef.current &&
//         !autocompleteRef.current.contains(event.target as Node)
//       ) {
//         setShowSuggestions(false);
//       }
//     };

//     // Add event listener for outside clicks to close the suggestions dropdown
//     document.addEventListener("click", handleOutsideClick);

//     // Clean up the event listener on component unmount
//     return () => {
//       document.removeEventListener("click", handleOutsideClick);
//     };
//   }, []);

//   const onHandleSearchInputChange = (value: string) => {
//     // Update the search input value
//     setValue(value);
//   };

//   const handleSuggestionClick = (suggestion: string) => {
//     // Set the selected suggestion as the search input value and close the suggestions dropdown
//     setValue(suggestion);
//     setShowSuggestions(false);
//   };
//   const handleSearchInputFocus = () => {
//     setShowSuggestions(true);
//   };

//   return (
//     <div className={styles.App}>
//       <div ref={autocompleteRef}>
//         <Search
//           setSearchValue={onHandleSearchInputChange}
//           handleSearchInputFocus={handleSearchInputFocus}
//           value={value}
//         />
//         {showSuggestions && suggestions.length > 0 && (
//           <SuggestionsList
//             searchValue={value}
//             suggestions={suggestions}
//             onClick={handleSuggestionClick}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
