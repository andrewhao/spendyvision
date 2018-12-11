import * as React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import classNames from "classnames";
import { drawerWidth } from "./Navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IAppState } from "src/rootTypes";
import { toggleMenu } from "../actions";

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      backgroundColor: "#61C9A8",
      color: "#FFFFFF"
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
  });

interface IHeaderProps extends WithStyles<typeof styles> {
  open: boolean;
  handleMenuClick(): void;
}

export const Header: React.SFC<IHeaderProps> = ({
  handleMenuClick,
  classes,
  open
}) => {
  return (
    <AppBar
      position="absolute"
      color="inherit"
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
          Spendyvision!
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

function mapStateToProps(state: IAppState) {
  return {
    open: state.isDrawerOpen
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return { handleMenuClick: () => dispatch(toggleMenu()) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header));
