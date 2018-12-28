import * as React from "react";
import { AppBar, Toolbar, Typography, Tabs, Tab } from "@material-ui/core";

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
import { withRouter } from "react-router-dom";
import { IAppStore } from "src/rootTypes";
import { toggleMenu } from "../actions";
import Glasses from "../images/glasses.svg";

// import HomeIcon from "@material-ui/icons/Home";
// import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
// import CategoryIcon from "@material-ui/icons/Category";
// import DonutSmallIcon from "@material-ui/icons/DonutSmall";
// import TimelineIcon from "@material-ui/icons/Timeline";

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
    },
    logo: {
      height: "2rem"
    },
    headerType: {
      fontFamily: "Shrikhand"
    },
    appBarLogo: {
      marginTop: "1rem",
      textAlign: "center"
    },
    appBarActions: {},
    toolBar: {
      flexDirection: "column"
    }
  });

interface IHeaderProps extends WithStyles<typeof styles> {
  open: boolean;
  history: any;
  location: any;
  match: any;
  handleMenuClick(): void;
}

export const Header: React.SFC<IHeaderProps> = ({
  handleMenuClick,
  classes,
  open,
  location,
  history
}) => {
  const handleNavigation = (e: any, value: any) => {
    history.push(value);
  };

  return (
    <AppBar
      position="absolute"
      color="inherit"
      className={classNames(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolBar}>
        <div className={classes.appBarLogo}>
          <img src={Glasses} className={classes.logo} />

          <Typography
            className={classes.headerType}
            variant="title"
            color="inherit"
          >
            Spendyvision
          </Typography>
        </div>
        <div className={classes.appBarActions}>
          <Tabs value={location.pathname} onChange={handleNavigation}>
            <Tab label="Home" value="/" />
            <Tab label="Summary" value="/summary" />
            <Tab label="Monthly Reports" value="/monthly" />
            <Tab label="By Category" value="/categories" />
            <Tab label="Transactions" value="/transactions" />
          </Tabs>
        </div>
      </Toolbar>
    </AppBar>
  );
};

function mapStateToProps(state: IAppStore) {
  return {
    open: state.isDrawerOpen
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return { handleMenuClick: () => dispatch(toggleMenu()) };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Header))
);
