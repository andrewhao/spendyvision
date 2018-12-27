import * as React from "react";
import {
  Button,
  withStyles,
  createStyles,
  WithStyles
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Dropzone from "react-dropzone";
import * as R from "ramda";
import * as Papa from "papaparse";

type ICsvUploadFn = (results: any[], filename: string) => void;

interface ICsvFileUploadProps extends WithStyles<typeof styles> {
  handleCsvUpload: ICsvUploadFn;
  history: any;
  location: any;
  match: any;
}

const styles = createStyles({
  dropzoneBase: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "#666",
    borderStyle: "dashed",
    borderRadius: 5
  }
});

function CsvFileUpload(props: ICsvFileUploadProps) {
  const { history, classes } = props;

  const handleDrop = (acceptedFiles: File[]): void => {
    const result = R.head(acceptedFiles);

    if (result === undefined) {
      return;
    }

    Papa.parse(result, {
      complete: (parseResult: Papa.ParseResult, file: File) => {
        uploadAndRedirect(parseResult.data, file.name);
      }
    });
  };

  const uploadAndRedirect: ICsvUploadFn = (results, filename) => {
    props.handleCsvUpload(results, filename);
    history.push("/summary");
  };

  return (
    <div className="csv-file-upload" style={{ display: "inline-block" }}>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps, isDragActive }) => {
          return (
            <div {...getRootProps()} className={classes.dropzoneBase}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop files here...</p>
              ) : (
                <React.Fragment>
                  <p>
                    Try dropping some files here, or click to select files to
                    upload.
                  </p>
                  <p>
                    <Button color="primary" variant="raised">
                      Upload
                    </Button>
                  </p>
                </React.Fragment>
              )}
            </div>
          );
        }}
      </Dropzone>
    </div>
  );
}

export default withRouter(withStyles(styles)(CsvFileUpload));
