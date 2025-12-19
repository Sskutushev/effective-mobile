import { renderHook, act } from '@testing-library/react';
import { useScroll } from '@hooks/useScroll';

describe('useScroll', () => {
  it('should return false when scroll is below threshold', () => {
    const { result } = renderHook(() => useScroll(100));

    expect(result.current).toBe(false);
  });

  it('should return true when scroll is above threshold', () => {
    const { result } = renderHook(() => useScroll(100));

    act(() => {
      window.scrollY = 150;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  it('should update when scroll position changes', () => {
    const { result } = renderHook(() => useScroll(100));

    act(() => {
      window.scrollY = 50;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe(false);

    act(() => {
      window.scrollY = 200;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe(true);
  });
});
