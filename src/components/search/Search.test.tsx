import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Search from "./Search";

describe("Search", () => {
  const setSearchValue = jest.fn();
  const showSuggestions = jest.fn();
  const value = "example value";

  it("should render the search input", () => {
    render(
      <Search
        setSearchValue={setSearchValue}
        showSuggestions={showSuggestions}
        value={value}
      />
    );
    const searchInput = screen.getByRole<HTMLInputElement>("textbox");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe(value);
  });

  it("should call setSearchValue when input value changes", () => {
    render(
      <Search
        setSearchValue={setSearchValue}
        showSuggestions={showSuggestions}
        value={value}
      />
    );
    const searchInput = screen.getByRole("textbox");
    const newValue = "new value";
    fireEvent.change(searchInput, { target: { value: newValue } });
    expect(setSearchValue).toHaveBeenCalledWith(newValue.trim());
  });

  it("should call showSuggestions with true when input is focused", () => {
    render(
      <Search
        setSearchValue={setSearchValue}
        showSuggestions={showSuggestions}
        value={value}
      />
    );
    const searchInput = screen.getByRole("textbox");
    fireEvent.focus(searchInput);
    expect(showSuggestions).toHaveBeenCalledWith(true);
  });
});
