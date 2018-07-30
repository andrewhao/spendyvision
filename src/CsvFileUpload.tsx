import * as React from "react";
import CSVReader from "react-csv-reader";

type ICsvUploadFn = (results: any[], filename: string) => void;

interface ICsvFileUploadProps {
  handleCsvUpload: ICsvUploadFn;
}

function CsvFileUpload(props: ICsvFileUploadProps) {
  return (
    <div className="csv-file-upload">
      <CSVReader label="Upload" onFileLoaded={props.handleCsvUpload} />
    </div>
  );
}

export default CsvFileUpload;
