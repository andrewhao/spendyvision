import * as React from "react";
import classNames from "classnames";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
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
import { ActivePanel } from "../types/view";

const theme = createMuiTheme();
export const drawerWidth = 280;

const styles: any = {
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
};

interface INavigationProps {
  classes: any;
  open: boolean;
  activePanel: ActivePanel;
  handleDrawerClose(): void;
  handleItemClick(activePanel: ActivePanel): any;
}

function Navigation({
  classes,
  open,
  handleDrawerClose,
  handleItemClick,
  activePanel
}: INavigationProps) {
  const summaryIconColor =
    activePanel === ActivePanel.Summary ? "primary" : "inherit";
  const byCategoryIconColor =
    activePanel === ActivePanel.Category ? "primary" : "inherit";
  const detailedTransactionIconColor =
    activePanel === ActivePanel.DetailedTransaction ? "primary" : "inherit";
  const monthlyReportIconColor =
    activePanel === ActivePanel.MonthlyReport ? "primary" : "inherit";
  const homeIconColor =
    activePanel === ActivePanel.Home ? "primary" : "inherit";
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
          <Link to="/">
            <Tooltip title="Upload an order report" placement="right">
              <ListItem button={true}>
                <ListItemIcon>
                  <HomeIcon color={homeIconColor} />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Tooltip>
          </Link>
          <Link to="/summary">
            <Tooltip
              title="See a summary of your purchase history"
              placement="right"
            >
              <ListItem
                button={true}
                onClick={handleItemClick(ActivePanel.Summary)}
              >
                <ListItemIcon>
                  <TimelineIcon color={summaryIconColor} />
                </ListItemIcon>
                <ListItemText primary="Big Picture Summary" />
              </ListItem>
            </Tooltip>
          </Link>
          <Link to="/monthly">
            <Tooltip
              title="See a monthly view of your spending"
              placement="right"
            >
              <ListItem
                button={true}
                onClick={handleItemClick(ActivePanel.MonthlyReport)}
              >
                <ListItemIcon>
                  <DonutSmallIcon color={monthlyReportIconColor} />
                </ListItemIcon>
                <ListItemText primary="Monthly Report" />
              </ListItem>
            </Tooltip>
          </Link>

          <Link to="/categories">
            <Tooltip title="See trends by purchase category" placement="right">
              <ListItem
                button={true}
                onClick={handleItemClick(ActivePanel.Category)}
              >
                <ListItemIcon>
                  <CategoryIcon color={byCategoryIconColor} />
                </ListItemIcon>
                <ListItemText primary="Category Trends" />
              </ListItem>
            </Tooltip>
          </Link>
          <Link to="/transactions">
            <Tooltip title="View all transactions" placement="right">
              <ListItem
                button={true}
                onClick={handleItemClick(ActivePanel.DetailedTransaction)}
              >
                <ListItemIcon>
                  <ViewHeadlineIcon color={detailedTransactionIconColor} />
                </ListItemIcon>
                <ListItemText primary="Detailed Transactions" />
              </ListItem>
            </Tooltip>
          </Link>
        </List>
      </Drawer>
    </div>
  );
}

export default withStyles(styles)(Navigation);
