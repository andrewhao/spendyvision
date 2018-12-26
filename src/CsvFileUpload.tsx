import * as React from "react";
import { Button, withStyles } from "@material-ui/core";
import CSVReader from "react-csv-reader";
import { withRouter } from "react-router-dom";

type ICsvUploadFn = (results: any[], filename: string) => void;

interface ICsvFileUploadProps {
  handleCsvUpload: ICsvUploadFn;
  classes: any;
  history: any;
  location: any;
  match: any;
}

const styles: any = {
  fileInput: {
    display: "none"
  }
};

function CsvFileUpload(props: ICsvFileUploadProps) {
  const { history } = props;
  const uploadAndRedirect: ICsvUploadFn = (results, filename) => {
    props.handleCsvUpload(results, filename);
    history.push("/summary");
  };
  return (
    <div className="csv-file-upload" style={{ display: "inline-block" }}>
      <CSVReader
        label="Upload Amazon Order Report"
        onFileLoaded={uploadAndRedirect}
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

export default withRouter(withStyles(styles)(CsvFileUpload));
