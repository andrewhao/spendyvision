import * as React from "react";
import {
  Button,
  withStyles,
  createStyles,
  WithStyles,
  Theme
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Dropzone from "react-dropzone";
import * as R from "ramda";
import * as Papa from "papaparse";
import classNames from "classnames";

type ICsvUploadFn = (results: any[], filename: string) => void;

interface ICsvFileUploadProps extends WithStyles<typeof styles> {
  handleCsvUpload: ICsvUploadFn;
  history: any;
  location: any;
  match: any;
}

const styles = (theme: Theme) =>
  createStyles({
    dropzoneBase: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: 200,
      borderWidth: 2,
      borderColor: "#666",
      borderStyle: "dashed",
      borderRadius: 5,
      padding: "1rem"
    },
    dropzoneActive: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.getContrastText(theme.palette.background.default)
    },
    dropzoneRejected: {
      backgroundColor: "red",
      color: "white"
    },
    dropzoneAccepted: {
      backgroundColor: "green",
      color: "white"
    },
    dropzoneMessage: {
      marginBottom: "10px"
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
    <div className="csv-file-upload">
      <Dropzone onDrop={handleDrop} accept="text/csv">
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragAccept,
          isDragReject
        }) => {
          let message =
            'Drag and drop the Amazon Order Items CSV here, or click "Upload"';
          if (isDragReject) {
            message =
              "Sorry, I don't recognize that file type! Please make sure you are uploading a CSV.";
          } else if (isDragAccept) {
            message = "Let's do this!";
          }

          return (
            <div
              {...getRootProps()}
              className={classNames(classes.dropzoneBase, {
                [classes.dropzoneActive]: isDragActive,
                [classes.dropzoneRejected]: isDragReject,
                [classes.dropzoneAccepted]: isDragAccept
              })}
            >
              <input {...getInputProps()} />
              <div className={classes.dropzoneMessage}>{message}</div>
              <div>
                <Button color="primary" variant="raised">
                  Upload
                </Button>
              </div>
            </div>
          );
        }}
      </Dropzone>
    </div>
  );
}

export default withRouter(withStyles(styles)(CsvFileUpload));
