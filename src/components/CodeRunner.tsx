import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import { versionMap } from "../utils/languages";
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: "#c5d3e8",
    },
  }),
);

interface CodeRunnerInterface {
  open: boolean;
  close: () => void;
  content: string;
  lang: string;
}

const CodeRunner: React.FC<CodeRunnerInterface> = ({
  open,
  close,
  content,
  lang,
}) => {
  const classes = useStyles();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    const body = {
      language: lang,
      version: versionMap.get(lang),
      files: [
        {
          name: "my_cool_code." + lang,
          content: content,
        },
      ],
      stdin: input,
    };

    const res = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.run) {
      setOutput(data.run.output);
    } else {
      setOutput(data.message);
    }
    setTimeout(() => {
      setLoading(false);
    }, 10 * 1000);
  };
  const handleClose = () => {
    setOutput("");
    close();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <div className={classes.root}>
        <DialogTitle>Code Runner</DialogTitle>
        <DialogContent>
          <div>Input</div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            id="input"
          />
          <br />
          {output !== "" ? (
            <>
              <div>Output</div>
              <textarea value={output} disabled />
            </>
          ) : (
            ""
          )}
          {loading ? (
            <div>Please wait few seconds before another request</div>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button disabled={loading} onClick={handleRun} color="primary">
            Run
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default CodeRunner;
