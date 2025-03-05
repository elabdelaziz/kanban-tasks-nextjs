import useLocalStorageState from "use-local-storage-state";
import { useState, Dispatch, SetStateAction } from "react";

const useLocalStorage = <T>(
  keyName: string,
  initialValue: T,
  options?: object
): [T, Dispatch<SetStateAction<T>>] => {
  let returnState = useState<T>(initialValue);

  try {
    const [value, setValue] = useLocalStorageState<T>(keyName, {
      defaultValue: initialValue,
      ...options,
    });
    returnState = [value, setValue];
  } catch (e) {
    console.error(e);
  }

  return returnState;
};

export default useLocalStorage;
