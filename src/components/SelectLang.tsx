import React from "react";
import useCodeStore from "../store/useCodeStore";

export default function SelectLang() {
  const lang = useCodeStore((state) => state.lang);
  const setLang = useCodeStore((state) => state.setLang);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLang(event.target.value as string);
  };

  return (
    <div className="select-dropdown">
      <select value={lang} onChange={handleChange}>
        <option value={"js"}>Javascript</option>
        <option value={"ts"}>Typescript</option>
        <option value={"json"}>JSON</option>
        <option value={"html"}>HTML</option>
        <option value={"css"}>CSS</option>
        <option value={"java"}>Java</option>
        <option value={"py"}>Python</option>
        <option value={"cpp"}>C++</option>
        <option value={"rs"}>Rust</option>
        <option value={"txt"}>Plain text</option>
      </select>
    </div>
  );
}
