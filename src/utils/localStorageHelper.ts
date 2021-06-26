export const getCode = (): string =>
  localStorage.getItem("vw-code")
    ? localStorage.getItem("vw-code")!
    : "// Code here";

export const getLang = (): string =>
  localStorage.getItem("vw-lang") ? localStorage.getItem("vw-lang")! : "js";
