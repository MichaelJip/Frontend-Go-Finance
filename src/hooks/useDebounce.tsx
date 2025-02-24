import { useRef } from "react";

const useDebounce = () => {
  const debounceTimeOut = useRef<NodeJS.Timeout | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const debounce = (func: Function, delay: number) => {
    if (debounceTimeOut.current) clearTimeout(debounceTimeOut.current);
    debounceTimeOut.current = setTimeout(() => {
      func();
      debounceTimeOut.current = null;
    }, delay);
  };
  
  return debounce;
};

export default useDebounce;
