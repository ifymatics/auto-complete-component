import {
  render,
  fireEvent,
  waitFor,
  screen,
  Matcher,
} from "@testing-library/react";
import App from "./App";

export const getByTextWithRegex = (
  searchTerm: RegExp | string,
  options?: Matcher
): HTMLElement => {
  const matches = Array.from(screen.getAllByText(searchTerm));

  const regex = new RegExp(searchTerm, "i");
  const matchingElement = matches.find((element) =>
    regex.test(element.textContent || "")
  );

  if (!matchingElement) {
    throw new Error(`Unable to find element with text: ${searchTerm}`);
  }

  return matchingElement;
};
describe("App", () => {
  it("should render the app and handle search input", async () => {
    render(<App />);
    const searchInput = screen.getByRole<HTMLInputElement>("textbox");
    expect(searchInput).toBeInTheDocument();

    fireEvent.focus(searchInput);
    fireEvent.change(searchInput, { target: { value: "lon" } });

    await waitFor(() => {
      const suggestion = getByTextWithRegex(/lon/i); //screen.getByText("Lon");
      //"<b>lon</b>don"
      expect(suggestion).toBeInTheDocument();
    });

    fireEvent.click(getByTextWithRegex(/lon/i));
    expect(searchInput).toBeInTheDocument();
  });

  it("should hide suggestions when clicked outside the component", () => {
    render(<App />);
    const searchInput = screen.getByRole("textbox");
    fireEvent.focus(searchInput);

    expect(screen.getByText("London")).toBeInTheDocument();

    fireEvent.click(document);
    expect(screen.queryByText("London")).not.toBeInTheDocument();
  });
});
