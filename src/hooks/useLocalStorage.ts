import { useState, useEffect } from 'react';

type Serializer<T> = (value: T) => string;
type Deserializer<T> = (value: string) => T;

const defaultSerializer = (value: unknown): string => JSON.stringify(value);
const defaultDeserializer = (value: string): unknown => JSON.parse(value);

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  serializer: Serializer<T> = defaultSerializer,
  deserializer: Deserializer<T> = defaultDeserializer as Deserializer<T>,
): [T, (value: T) => void] {
  const readValue = (): T => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return initialValue;
      }
      return deserializer(item);
    } catch {
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValue = (value: T): void => {
    setStoredValue(value);
    try {
      const serialized = serializer(value);
      window.localStorage.setItem(key, serialized);
    } catch {
      // ignore write errors
    }
  };

  return [storedValue, setValue];
}
