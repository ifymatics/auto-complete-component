export function makeSearchWordBold(word: string, suggestions: string[]) {
  if (!word) return suggestions;

  const wordRegex = new RegExp(word, "gi");

  return suggestions.map((suggestion) =>
    suggestion.replace(wordRegex, (match) => `<b>${match}</b>`)
  );
}
