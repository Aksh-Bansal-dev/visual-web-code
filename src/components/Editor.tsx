import React from "react";
import MonacoEditor from "react-monaco-editor";
import useCodeStore from "../store/useCodeStore";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { GetApp, PlayArrow } from "@material-ui/icons";
import langMap, { versionMap } from "../utils/languages";
import DownloadModal from "./DownloadModal";
import CodeRunner from "./CodeRunner";

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
      zIndex: 10,
      color: "white",
      background: "rgba(250, 250, 250, 0.3)",
    },
    floatBtn2: {
      position: "fixed",
      bottom: "15vh",
      right: "5vh",
      zIndex: 10,
      color: "white",
      background: "rgba(250, 250, 250, 0.3)",
    },
  }),
);

const Editor: React.FC = () => {
  const classes = useStyles();
  const [downloadOpen, setDownloadOpen] = React.useState(false);
  const [runnerOpen, setRunnerOpen] = React.useState(false);
  const code = useCodeStore((state) => state.code);
  const lang = useCodeStore((state) => state.lang);
  const setCode = useCodeStore((state) => state.setCode);
  const options = {
    selectOnLineNumbers: true,
  };
  React.useEffect(() => {
    const timer = setInterval(function () {
      // console.log(code);
      console.log("Saving...");
      localStorage.setItem("vw-code", code);
      localStorage.setItem("vw-lang", lang);
    }, 15 * 1000);

    return () => clearInterval(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, lang]);
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
        <GetApp color="inherit" />
      </IconButton>
      {versionMap.has(lang) ? (
        <>
          <IconButton
            className={classes.floatBtn2}
            onClick={() => setRunnerOpen(true)}
          >
            <PlayArrow color="inherit" />
          </IconButton>
          <CodeRunner
            open={runnerOpen}
            content={code}
            lang={lang}
            close={() => setRunnerOpen(false)}
          />
        </>
      ) : null}
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
