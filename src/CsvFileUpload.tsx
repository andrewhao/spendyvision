import * as React from "react";
import CSVReader from "react-csv-reader";

type ICsvUploadFn = (results: any[], filename: string) => void;

interface ICsvFileUploadProps {
  handleCsvUpload: ICsvUploadFn;
}

function CsvFileUpload(props: ICsvFileUploadProps) {
  return (
    <div className="csv-file-upload" style={{ display: "inline-block" }}>
      <CSVReader
        label="Upload"
        onFileLoaded={props.handleCsvUpload}
        inputId="csv-file-upload__input"
      />
    </div>
  );
}

export default CsvFileUpload;
