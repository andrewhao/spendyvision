import * as React from "react";
import classNames from "classnames";
import {
  withStyles,
  WithStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import {
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import HomeIcon from "@material-ui/icons/Home";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import CategoryIcon from "@material-ui/icons/Category";
import DonutSmallIcon from "@material-ui/icons/DonutSmall";
import TimelineIcon from "@material-ui/icons/Timeline";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Dispatch } from "redux";
import { IAppStore, IAppAction } from "src/rootTypes";
import { toggleMenu } from "../actions";

export const drawerWidth = 280;

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing.unit * 7,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing.unit * 9
      }
    }
  });

interface INavigationProps extends WithStyles<typeof styles> {
  open: boolean;
  history: any;
  location: any;
  match: any;
  handleDrawerClose(): IAppAction;
}

const Navigation: React.SFC<INavigationProps> = ({
  classes,
  open,
  handleDrawerClose,
  location
}: INavigationProps) => {
  const summaryIconColor =
    location.pathname === "/summary" ? "primary" : "inherit";
  const byCategoryIconColor =
    location.pathname === "/categories" ? "primary" : "inherit";
  const detailedTransactionIconColor =
    location.pathname === "/transactions" ? "primary" : "inherit";
  const monthlyReportIconColor =
    location.pathname === "/monthly" ? "primary" : "inherit";
  const homeIconColor = location.pathname === "/" ? "primary" : "inherit";

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !open && classes.drawerPaperClose
          )
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <NavLink to="/">
            <Tooltip title="Upload an order report" placement="right">
              <ListItem button={true}>
                <ListItemIcon>
                  <HomeIcon color={homeIconColor} />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Tooltip>
          </NavLink>
          <NavLink to="/summary">
            <Tooltip
              title="See a summary of your purchase history"
              placement="right"
            >
              <ListItem button={true}>
                <ListItemIcon>
                  <TimelineIcon color={summaryIconColor} />
                </ListItemIcon>
                <ListItemText primary="Big Picture Summary" />
              </ListItem>
            </Tooltip>
          </NavLink>
          <NavLink to="/monthly">
            <Tooltip
              title="See a monthly view of your spending"
              placement="right"
            >
              <ListItem button={true}>
                <ListItemIcon>
                  <DonutSmallIcon color={monthlyReportIconColor} />
                </ListItemIcon>
                <ListItemText primary="Monthly Report" />
              </ListItem>
            </Tooltip>
          </NavLink>

          <NavLink to="/categories">
            <Tooltip title="See trends by purchase category" placement="right">
              <ListItem button={true}>
                <ListItemIcon>
                  <CategoryIcon color={byCategoryIconColor} />
                </ListItemIcon>
                <ListItemText primary="Category Trends" />
              </ListItem>
            </Tooltip>
          </NavLink>
          <NavLink to="/transactions">
            <Tooltip title="View all transactions" placement="right">
              <ListItem button={true}>
                <ListItemIcon>
                  <ViewHeadlineIcon color={detailedTransactionIconColor} />
                </ListItemIcon>
                <ListItemText primary="Detailed Transactions" />
              </ListItem>
            </Tooltip>
          </NavLink>
        </List>
      </Drawer>
    </div>
  );
};

function mapStateToProps(state: IAppStore) {
  return {
    open: state.isDrawerOpen
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    handleDrawerClose: () => dispatch(toggleMenu())
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Navigation))
);
