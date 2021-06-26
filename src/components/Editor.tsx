import React from "react";
import MonacoEditor from "react-monaco-editor";
import useCodeStore from "../store/useCodeStore";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import langMap from "../utils/languages";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100vw",
      height: "90vh",
    },
    floatBtn: {
      position: "fixed",
      bottom: "5vh",
      right: "5vh",
      zIndex: 1000,
      color: "white",
      background: "rgba(250, 250, 250, 0.3)",
    },
  })
);

const Editor: React.FC = () => {
  const classes = useStyles();
  const code = useCodeStore((state) => state.code);
  const lang = useCodeStore((state) => state.lang);
  const setCode = useCodeStore((state) => state.setCode);
  const options = {
    selectOnLineNumbers: true,
  };
  function download(filename: string, text: string) {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
  const handleDownload = () => {
    const name = "code" + Math.floor(Math.random() * 1000 + 1) + "." + lang;
    download(name, code);
  };
  return (
    <div className={classes.root}>
      <MonacoEditor
        width="100vw"
        height="100%"
        language={langMap.get(lang)}
        theme="vs-dark"
        value={code}
        options={options}
        onChange={(e) => setCode(e)}
      />
      <IconButton className={classes.floatBtn} onClick={handleDownload}>
        <Save color="inherit" />
      </IconButton>
    </div>
  );
};
export default Editor;
