import React from "react";
import "./App.css";
import Editor from "./components/Editor";
import FileUpload from "./components/FileUpload";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import useCodeStore from "./store/useCodeStore";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: "100vh",
      backgroundColor: "#3a404d",
    },
  }),
);

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const classes = useStyles();
  const setCode = useCodeStore((state) => state.setCode);
  const setLang = useCodeStore((state) => state.setLang);
  React.useEffect(() => {
    const prevCode = localStorage.getItem("vw-code");
    const prevLang = localStorage.getItem("vw-lang");
    if (prevCode && prevLang) {
      setCode(prevCode);
      setLang(prevLang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={classes.root}>
      <FileUpload />
      <Editor />
    </div>
  );
};

export default App;
