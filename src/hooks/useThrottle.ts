import { useCallback, useState } from "react";

export function useThrottle<T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 1000
): T {
  const [isThrottled, setIsThrottled] = useState(false);

  const throttledFunction = useCallback(
    (...args: Parameters<T>) => {
      if (!isThrottled) {
        setIsThrottled(true);
        fn(...args);
        setTimeout(() => {
          setIsThrottled(false);
        }, delay);
      }
    },
    [isThrottled, fn, delay]
  );

  return throttledFunction as T;
}
