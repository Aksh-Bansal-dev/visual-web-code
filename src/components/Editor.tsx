import React from "react";
import MonacoEditor from "react-monaco-editor";
import useCodeStore from "../store/useCodeStore";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import langMap from "../utils/languages";
import DownloadModal from "./DownloadModal";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100vw",
      height: "95vh",
    },
    floatBtn: {
      position: "fixed",
      bottom: "5vh",
      right: "5vh",
      zIndex: 1000,
      color: "white",
      background: "rgba(250, 250, 250, 0.3)",
    },
  }),
);

const Editor: React.FC = () => {
  const classes = useStyles();
  const [downloadOpen, setDownloadOpen] = React.useState(false);
  const code = useCodeStore((state) => state.code);
  const lang = useCodeStore((state) => state.lang);
  const setCode = useCodeStore((state) => state.setCode);
  const options = {
    selectOnLineNumbers: true,
  };
  return (
    <div className={classes.root}>
      <MonacoEditor
        width="100vw"
        height="95vh"
        language={langMap.get(lang)}
        theme="vs-dark"
        value={code}
        options={options}
        onChange={(e) => setCode(e)}
      />
      <IconButton
        className={classes.floatBtn}
        onClick={() => setDownloadOpen(true)}
      >
        <Save color="inherit" />
      </IconButton>
      <DownloadModal
        open={downloadOpen}
        content={code}
        lang={lang}
        close={() => setDownloadOpen(false)}
      />
    </div>
  );
};
export default Editor;
