import create from "zustand";

interface CodeInterface {
  code: string;
  lang: string;
  setCode: (newCode: string) => void;
  setLang: (lang: string) => void;
}

const useCodeStore = create<CodeInterface>((set) => ({
  code: "// Code here",
  lang: "js",
  setCode: (newCode) => set(() => ({ code: newCode })),
  setLang: (lang) => set(() => ({ lang })),
}));

export default useCodeStore;
