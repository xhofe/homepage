import { createSignal } from "solid-js";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = createSignal<T>(
    (() => {
      if (typeof window === "undefined") {
        return initialValue;
      }
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        if (!item) {
          return initialValue;
        }
        // Parse stored json or if none return initialValue
        return typeof item === "string" ? item : JSON.parse(item);
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    })()
  );
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore: T =
        value instanceof Function ? value(storedValue()) : value;
      // Save state
      setStoredValue(() => valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          key,
          typeof valueToStore === "string"
            ? valueToStore
            : JSON.stringify(valueToStore)
        );
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}
