import { useEffect, useState } from 'react';

import { getStorageItem, setStorageItem } from '@/utils/localStorage';

const useLocalStorage = (key: string, initialValue: string) => {
  const [storageValue, setStorageValue] = useState<string>(() => {
    try {
      const value = getStorageItem(key);
      return value || initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      setStorageItem(key, storageValue);
    } catch (error) {
      console.log(error);
    }
  }, [key, storageValue]);

  return { storageValue, setStorageValue };
};

export default useLocalStorage;
