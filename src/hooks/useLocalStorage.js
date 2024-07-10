import { useState } from 'react';

/**
 * Hook per la gestione dello stato in localStorage per la visualizzazione
 * del grafico o della tabella.
 * @param key Chiave per l'elemento in localStorage
 * @param initialValue Valore iniziale dello stato
 * @returns {(any|setValue)[]} Array con lo stato e la funzione per aggiornarlo
 */
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
