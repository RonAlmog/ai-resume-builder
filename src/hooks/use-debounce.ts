import { useEffect, useState } from "react";

// Generic! allow to pass any type.
// default time: 250ms
export default function useDebounce<T>(value: T, delay: number = 250) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // clean up the timeout on every change of the input.
    // so setDebouncedValue(value) will only happen if
    // no input change for 250ms.
    return () => clearTimeout(handler);
  }, [value, delay]);

  // the return value is the same type as the input
  return debouncedValue;
}
