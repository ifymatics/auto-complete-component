import { render, screen, fireEvent } from "@testing-library/react";
import SuggestionsList from "./SuggestionsList";
import { makeSearchWordBold } from "../../utils/makeBold";
import { getByTextWithRegex } from "../../App.test";

jest.mock("../../utils/makeBold", () => ({
  makeSearchWordBold: (word: string, suggestions: string[]) =>
    suggestions.map((suggestion) =>
      suggestion.replace(new RegExp(word, "gi"), `<b>${word}</b>`)
    ),
}));

describe("SuggestionsList", () => {
  test("renders suggestions list with modified suggestions", () => {
    const suggestions = ["Apple", "Banana", "Orange"];
    const word = "an";

    render(
      <SuggestionsList
        suggestions={suggestions}
        onClick={jest.fn()}
        searchValue={word}
      />
    );

    const modifiedSuggestions = makeSearchWordBold(word, suggestions);

    const suggestionItems = screen.getAllByRole("listitem");

    // Each suggestion item should be rendered with the modified suggestion
    suggestionItems.forEach((suggestionItem, index) => {
      const modifiedSuggestion = modifiedSuggestions[index];
      expect(suggestionItem.innerHTML).toBe(modifiedSuggestion);
    });
  });

  test("invokes onClick callback when a suggestion is clicked", () => {
    const suggestions = ["Apple", "Banana", "Orange"];
    const word = "Bana";
    const onClickMock = jest.fn();

    render(
      <SuggestionsList
        suggestions={suggestions}
        onClick={onClickMock}
        searchValue={word}
      />
    );

    const suggestionItem = getByTextWithRegex(/Bana/i);
    /*screen.getByText("Banana")*/

    fireEvent.click(suggestionItem);

    // onClick callback should be invoked with the selected suggestion
    expect(onClickMock).toHaveBeenCalledWith("Banana");
  });
});
