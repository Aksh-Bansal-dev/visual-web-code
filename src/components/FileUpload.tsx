import React, { useState } from "react";
import useCodeStore from "../store/useCodeStore";
import { createWorker } from "tesseract.js";
import SelectLang from "./SelectLang";

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
      autoComplete="off"
      onSubmit={(e) => handleSubmit(e)}
      style={{
        display: "flex",
        height: "10vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input
        name="foo"
        onChange={(e) => handleUpload(e)}
        id="file-input"
        type="file"
      />
      <SelectLang />
      <span style={{ color: "maroon", marginRight: "2vh" }}>{error}</span>
      <button disabled={loading} type="submit">
        Upload
      </button>
    </form>
  );
};
export default FileUpload;
