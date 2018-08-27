import * as React from "react";
import { Button, withStyles } from "@material-ui/core";
import CSVReader from "react-csv-reader";

type ICsvUploadFn = (results: any[], filename: string) => void;

interface ICsvFileUploadProps {
  handleCsvUpload: ICsvUploadFn;
  classes: any;
}

const styles: any = {
  fileInput: {
    display: "none"
  }
};

function CsvFileUpload(props: ICsvFileUploadProps) {
  return (
    <div className="csv-file-upload" style={{ display: "inline-block" }}>
      <CSVReader
        label="Upload Amazon Order Report"
        onFileLoaded={props.handleCsvUpload}
        cssClass={props.classes.fileInput}
        inputId="csv-file-upload__input"
      />
      <label htmlFor="csv-file-upload__input">
        <Button color="primary" variant="raised" component="span">
          Upload
        </Button>
      </label>
    </div>
  );
}

export default withStyles(styles)(CsvFileUpload);
