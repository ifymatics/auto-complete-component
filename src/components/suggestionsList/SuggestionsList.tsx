import { FC } from "react";
import styles from "./SuggestionsList.module.css";
import { makeSearchWordBold } from "../../utils/makeBold";
import { stripTags } from "../../utils/stripTags";

interface SuggestionsListProps {
  suggestions: string[];
  onClick: (value: string) => void;
  searchValue: string;
}

const SuggestionsList: FC<SuggestionsListProps> = ({
  suggestions = [],
  onClick,
  searchValue,
}) => {
  const modifiedSuggestions = searchValue
    ? makeSearchWordBold(searchValue, suggestions)
    : suggestions;

  return (
    <ul className={styles.suggestions}>
      {modifiedSuggestions.map((suggestion: string) => (
        <li
          key={suggestion}
          onClick={() => onClick(stripTags(suggestion))}
          dangerouslySetInnerHTML={{ __html: suggestion }}
        ></li>
      ))}
    </ul>
  );
};

export default SuggestionsList;
