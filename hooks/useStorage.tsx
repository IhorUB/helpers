type StorageType = 'session' | 'local';
type GetItem = (key: string, type?: StorageType) => string;
type SetItem = (key: string, value: string, type?: StorageType) => boolean;
type RemoveItem = (key: string, type?: StorageType) => void;

type UseStorageReturnValue = {
  getItem: GetItem;
  setItem: SetItem;
  removeItem: RemoveItem;
};

export const useStorage = (): UseStorageReturnValue => {
  const getStorageType = (
    type?: StorageType
  ): 'localStorage' | 'sessionStorage' => `${type ?? 'session'}Storage`;

  const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();

  const getItem: GetItem = (key, type) =>
    isBrowser ? window[getStorageType(type)][key] ?? '' : '';

  const setItem: SetItem = (key, value, type) => {
    if (isBrowser) {
      window[getStorageType(type)].setItem(key, value);
      return true;
    }

    return false;
  };

  const removeItem: RemoveItem = (key, type) => {
    window[getStorageType(type)].removeItem(key);
  };

  return {
    getItem,
    setItem,
    removeItem
  };
};
