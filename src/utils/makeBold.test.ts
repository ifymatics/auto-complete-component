

import { makeSearchWordBold } from "./makeBold";

describe('makeSearchWordBold', () => {
    it('should make the search word bold in each string of the suggestions array', () => {
        const word = 'apple';
        const suggestions = ['I like apples', 'Apple pie is delicious', 'Oranges are sweet'];

        const expected = [
            'I like <b>apple</b>s',
            '<b>Apple</b> pie is delicious',
            'Oranges are sweet',
        ];

        const result = makeSearchWordBold(word, suggestions);
        expect(result).toEqual(expected);
    });

    it('should return the suggestions array as is when the search word is empty', () => {
        const word = '';
        const suggestions = ['I like apples', 'Apple pie is delicious', 'Oranges are sweet'];

        const result = makeSearchWordBold(word, suggestions);
        expect(result).toEqual(suggestions);
    });

    it('should handle an empty suggestions array', () => {
        const word = 'apple';
        const suggestions: string[] = [];

        const result = makeSearchWordBold(word, suggestions);
        expect(result).toEqual([]);
    });
});
