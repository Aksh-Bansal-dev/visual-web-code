import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import useCodeStore from "../store/useCodeStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      color: "white",
      margin: "0 1vh 0 1vh",
    },
  }),
);

export default function SelectLang() {
  const classes = useStyles();
  const lang = useCodeStore((state) => state.lang);
  const setLang = useCodeStore((state) => state.setLang);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLang(event.target.value as string);
  };

  return (
    <div>
      <span className={classes.label} id="lang-input">
        Language
      </span>
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
