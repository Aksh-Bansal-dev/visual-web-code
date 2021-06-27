import React, { useState } from "react";
import useCodeStore from "../store/useCodeStore";
import { createWorker } from "tesseract.js";
import SelectLang from "./SelectLang";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    label: {
      color: "white",
      margin: "0 2vh",
    },
    uploadBtn: {
      padding: "0 1vh",
      margin: "0 2vh",
      fontSize: "0.8rem",
    },
    error: {
      color: "pink",
      margin: "0 1vh",
    },
    inputBtn: {
      background: "none",
      border: "1px solid white",
      padding: "4px 1vh",
      borderRadius: "4px",
      fontSize: "0.9rem",
      cursor: "pointer",
    },
  }),
);

const getLang = (name: string) => {
  const extenstions = name.split(".");
  const len = extenstions.length;
  const lang = extenstions[len - 1];
  if (!lang) {
    return;
  }
  return lang;
};

const FileUpload: React.FC = () => {
  const classes = useStyles();
  const setCode = useCodeStore((state) => state.setCode);
  const setLang = useCodeStore((state) => state.setLang);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const worker = createWorker({
    logger: (m) => console.log(m),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("processing..");
    if (!file) {
      setError("No file selected");
      return;
    }

    // @ts-ignore
    if (
      getLang(file.name) === "png" ||
      getLang(file.name) === "jpeg" ||
      getLang(file.name) === "jpg"
    ) {
      (async () => {
        setLoading(true);
        await worker.load();
        await worker.loadLanguage("eng");
        await worker.initialize("eng");
        const {
          data: { text },
        } = await worker.recognize(file);
        setCode(text);
        setLoading(false);
        setFile(null);
      })();
    } else {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        // console.log(reader.result?.toString());
        setLang(getLang(file.name)!);
        setCode(reader.result?.toString()!);
      };
      setFile(null);
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target || !e.target.files || !e.target.files[0]) {
      return;
    }
    setError("");
    // @ts-ignore
    setFile(e.target.files[0]);
  };

  return (
    <form
      className={classes.label}
      autoComplete="off"
      onSubmit={(e) => handleSubmit(e)}
      style={{
        display: "flex",
        height: "5vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <span className={classes.label}>Select File/Image</span> */}
      <label className={classes.inputBtn}>
        {file ? file.name : "Select File/Image"}
        <input
          style={{ display: "none" }}
          name="foo"
          onChange={(e) => handleUpload(e)}
          id="file-input"
          type="file"
        />
      </label>
      <span className={classes.error}>{error}</span>
      <Button
        variant="outlined"
        color="inherit"
        className={classes.uploadBtn}
        disabled={loading}
        type="submit"
      >
        Upload
      </Button>
      <SelectLang />
    </form>
  );
};
export default FileUpload;
