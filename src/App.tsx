import React from "react";
import "./App.css";
import Editor from "./components/Editor";
import FileUpload from "./components/FileUpload";

import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: "100vh",
      // backgroundColor: "#3a404d",
      backgroundColor: "#2e2e2e",
    },
  }),
);

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FileUpload />
      <Editor />
    </div>
  );
};

export default App;
