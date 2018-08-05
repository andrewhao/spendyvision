import * as React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import CsvFileUpload from "../CsvFileUpload";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

interface IHeaderProps {
  classes: any;
  handleCsvUpload(results: any[]): void;
}

function Header({ handleCsvUpload, classes }: IHeaderProps) {
  return (
    <AppBar position="fixed" color="default">
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit">
          OMG, Amazon!
        </Typography>
        <label htmlFor="csv-file-upload__input">
          <Button color="inherit">Upload an Order Report</Button>
        </label>
        <CsvFileUpload handleCsvUpload={handleCsvUpload} />
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Header);
