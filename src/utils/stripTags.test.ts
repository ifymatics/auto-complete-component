import { stripTags } from "./stripTags";
describe('stripTags', () => {
    it('should remove HTML tags from a string', () => {
        const input = '<h1>Hello</h1><p>This is a paragraph</p>';
        const expectedOutput = 'HelloThis is a paragraph';

        const result = stripTags(input);

        expect(result).toEqual(expectedOutput);
    });

    it('should handle empty string', () => {
        const input = '';
        const expectedOutput = '';

        const result = stripTags(input);

        expect(result).toEqual(expectedOutput);
    });

    it('should handle string without HTML tags', () => {
        const input = 'No HTML tags in this string';
        const expectedOutput = 'No HTML tags in this string';

        const result = stripTags(input);

        expect(result).toEqual(expectedOutput);
    });
});
