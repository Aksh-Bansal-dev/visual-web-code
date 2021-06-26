import create from "zustand";
import { getCode, getLang } from "../utils/localStorageHelper";

interface CodeInterface {
  code: string;
  lang: string;
  setCode: (newCode: string) => void;
  setLang: (lang: string) => void;
}

const useCodeStore = create<CodeInterface>((set) => ({
  code: getCode(),
  lang: getLang(),
  setCode: (newCode) => set(() => ({ code: newCode })),
  setLang: (lang) => set(() => ({ lang })),
}));

export default useCodeStore;
