// import {
//   render,
//   fireEvent,
//   waitFor,
//   screen,
//   Matcher,
// } from "@testing-library/react";
// import App from "./App";

// export const getByTextWithRegex = (
//   searchTerm: RegExp | string,
//   options?: Matcher
// ): HTMLElement => {
//   const matches = Array.from(screen.getAllByText(searchTerm));

//   const regex = new RegExp(searchTerm, "i");
//   const matchingElement = matches.find((element) =>
//     regex.test(element.textContent || "")
//   );

//   if (!matchingElement) {
//     throw new Error(`Unable to find element with text: ${searchTerm}`);
//   }

//   return matchingElement;
// };
// describe("App", () => {
//   it("should render the app and handle search input", async () => {
//     render(<App />);
//     const searchInput = screen.getByRole<HTMLInputElement>("textbox");
//     expect(searchInput).toBeInTheDocument();

//     fireEvent.focus(searchInput);
//     fireEvent.change(searchInput, { target: { value: "lon" } });

//     await waitFor(() => {
//       const suggestion = getByTextWithRegex(/lon/i); //screen.getByText("Lon");
//       //"<b>lon</b>don"
//       expect(suggestion).toBeInTheDocument();
//     });

//     fireEvent.click(getByTextWithRegex(/lon/i));
//     expect(searchInput).toBeInTheDocument();
//   });

//   it("should hide suggestions when clicked outside the component", () => {
//     render(<App />);
//     const searchInput = screen.getByRole("textbox");
//     fireEvent.focus(searchInput);

//     expect(screen.getByText("London")).toBeInTheDocument();

//     fireEvent.click(document);
//     expect(screen.queryByText("London")).not.toBeInTheDocument();
//   });
// });
import { render, screen, fireEvent, Matcher } from "@testing-library/react";
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

// Mocking the custom hook
jest.mock("./customHooks/useHttp", () => ({
  __esModule: true,
  default: () => ({
    sendRequest: jest.fn(),
  }),
}));

describe("App", () => {
  test("renders the search input", () => {
    render(<App />);
    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toBeInTheDocument();
  });

  test("displays suggestions when typing in the search input", () => {
    render(<App />);
    const searchInput = screen.getByRole("textbox");

    fireEvent.focus(searchInput);
    fireEvent.change(searchInput, { target: { value: "Lon" } });

    const suggestionItem =
      /*screen.getByText("London");*/ getByTextWithRegex(/Lon/i);
    expect(suggestionItem).toBeInTheDocument();
  });

  test("selects a suggestion on suggestion item click", () => {
    render(<App />);
    const searchInput = screen.getByRole<HTMLInputElement>("textbox");

    fireEvent.focus(searchInput);
    fireEvent.change(searchInput, { target: { value: "Lon" } });

    const suggestionItem = getByTextWithRegex(/Lon/i); //screen.getByText("London");
    fireEvent.click(suggestionItem);

    expect(searchInput.value).toBe("London");
  });

  test("hides suggestions on outside click", () => {
    render(<App />);
    const searchInput = screen.getByRole("textbox");

    fireEvent.focus(searchInput);
    fireEvent.change(searchInput, { target: { value: "Lon" } });

    expect(getByTextWithRegex(/Lon/i)).toBeInTheDocument();

    fireEvent.click(document);

    expect(screen.queryByText("London")).toBeNull();
  });
  // test("fetches and renders data from API", async () => {
  //   // Mocking the API response
  //   const mockData = ["New York", "Los Angeles"];

  //   // Mocking the fetch function
  //   const originalFetch = global.fetch;
  //   const mockFetch = jest.fn().mockResolvedValue({
  //     ok: true,
  //     json: () => Promise.resolve(mockData),
  //   });
  //   global.fetch = mockFetch;

  //   render(<App />);

  //   // Wait for the API data to be rendered

  //   expect(mockFetch).toHaveBeenCalledWith("http://localhost:3005/cityNames", {
  //     method: "GET",
  //   });
  //   const newYorkElement = await screen.findByText("New York");
  //   const losAngelesElement = screen.getByText("Los Angeles");

  //   expect(newYorkElement).toBeInTheDocument();
  //   expect(losAngelesElement).toBeInTheDocument();

  //   // Restore the original fetch function
  //   global.fetch = originalFetch;
  // });
});
