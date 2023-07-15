
import { act, renderHook } from '@testing-library/react';
import useHttp from './useHttp';

describe('useHttp', () => {
    test('should return the correct initial values', () => {
        const { result } = renderHook(() => useHttp());
        const { isLoading, error, sendRequest } = result.current;

        expect(isLoading).toBe(false);
        expect(error).toBe(null);
        expect(typeof sendRequest).toBe('function');
    });

    test('should fetch data correctly', async () => {
        // Create a mock fetch function
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue({ data: 'mocked data' }),
        });

        const { result } = renderHook(() => useHttp());

        await act(async () => {
            await result.current.sendRequest({
                method: 'GET',
                url: 'https://example.com/api/data',
                headers: { Authorization: 'Bearer token' },
            }, (data) => {
                expect(data).toEqual({ data: 'mocked data' });
            });
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBe(null);
    });

    test('should handle request errors', async () => {
        // Create a mock fetch function
        global.fetch = jest.fn().mockRejectedValueOnce(new Error('Request failed!'));

        const { result } = renderHook(() => useHttp());

        await act(async () => {
            await result.current.sendRequest({
                method: 'POST',
                url: 'https://example.com/api/data',
                body: { name: 'John' },
            }, () => { });
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBe('Request failed!');
    });
});
