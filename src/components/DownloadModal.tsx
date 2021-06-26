import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

interface DownloadModalInterface {
  open: boolean;
  close: () => void;
  content: string;
  lang: string;
}

const DownloadModal: React.FC<DownloadModalInterface> = ({
  open,
  close,
  content,
  lang,
}) => {
  const [filename, setFilename] = useState(() => {
    const name = "code" + Math.floor(Math.random() * 1000 + 1) + "." + lang;
    return name;
  });
  function download(filename: string, text: string) {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text),
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
  const handleDownload = () => {
    download(filename, content);
    close();
  };
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>{filename}</DialogTitle>
      <DialogContent>
        <TextField
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          autoFocus
          margin="dense"
          id="file-name"
          label="File name"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDownload} color="primary">
          Download
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DownloadModal;
