import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  createMuiTheme
} from "@material-ui/core";
import CsvFileUpload from "../CsvFileUpload";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const theme = createMuiTheme();
const drawerWidth = 240;

const styles = {
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

interface IHeaderProps {
  open: boolean;
  classes: any;
  handleCsvUpload(results: any[]): void;
  handleMenuClick(): void;
}

function Header({
  handleCsvUpload,
  handleMenuClick,
  classes,
  open
}: IHeaderProps) {
  return (
    <AppBar
      position="absolute"
      color="default"
      className={classNames(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={handleMenuClick}
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
