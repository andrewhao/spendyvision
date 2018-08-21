import * as React from "react";
import classNames from "classnames";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import HomeIcon from "@material-ui/icons/Home";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import CategoryIcon from "@material-ui/icons/Category";
import DonutSmallIcon from "@material-ui/icons/DonutSmall";
import TimelineIcon from "@material-ui/icons/Timeline";
import { ActivePanel } from "../types/view";

const theme = createMuiTheme();
const drawerWidth = 240;

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
    activePanel === ActivePanel.Summary ? "secondary" : "inherit";
  const byCategoryIconColor =
    activePanel === ActivePanel.Category ? "secondary" : "inherit";
  const detailedTransactionIconColor =
    activePanel === ActivePanel.DetailedTransaction ? "secondary" : "inherit";
  const monthlyReportIconColor =
    activePanel === ActivePanel.MonthlyReport ? "secondary" : "inherit";
  const homeIconColor =
    activePanel === ActivePanel.Home ? "secondary" : "inherit";
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
          <ListItem button={true} onClick={handleItemClick(ActivePanel.Home)}>
            <ListItemIcon>
              <HomeIcon color={homeIconColor} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button={true}
            onClick={handleItemClick(ActivePanel.Summary)}
          >
            <ListItemIcon>
              <TimelineIcon color={summaryIconColor} />
            </ListItemIcon>
            <ListItemText primary="Summary" />
          </ListItem>
          <ListItem
            button={true}
            onClick={handleItemClick(ActivePanel.MonthlyReport)}
          >
            <ListItemIcon>
              <DonutSmallIcon color={monthlyReportIconColor} />
            </ListItemIcon>
            <ListItemText primary="Monthly Report" />
          </ListItem>
          <ListItem
            button={true}
            onClick={handleItemClick(ActivePanel.DetailedTransaction)}
          >
            <ListItemIcon>
              <ViewHeadlineIcon color={detailedTransactionIconColor} />
            </ListItemIcon>
            <ListItemText primary="Details" />
          </ListItem>

          <ListItem
            button={true}
            onClick={handleItemClick(ActivePanel.Category)}
          >
            <ListItemIcon>
              <CategoryIcon color={byCategoryIconColor} />
            </ListItemIcon>
            <ListItemText primary="Category Trends" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default withStyles(styles)(Navigation);
