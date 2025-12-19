import { renderHook, waitFor } from '@testing-library/react';
import { useDebounce } from '@hooks/useDebounce';

describe('useDebounce', () => {
  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 300));

    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 300 } }
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated', delay: 300 });
    expect(result.current).toBe('initial');

    await waitFor(() => {
      expect(result.current).toBe('updated');
    }, { timeout: 400 });
  });

  it('should update with new value after delay', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'first', delay: 300 } }
    );

    rerender({ value: 'second', delay: 300 });
    rerender({ value: 'third', delay: 300 });

    expect(result.current).toBe('first');

    await waitFor(() => {
      expect(result.current).toBe('third');
    }, { timeout: 400 });
  });
});