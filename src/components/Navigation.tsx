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
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import CategoryIcon from "@material-ui/icons/Category";
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
  const summaryIconColor = activePanel === "Summary" ? "secondary" : "inherit";
  const byCategoryIconColor =
    activePanel === "ByCategory" ? "secondary" : "inherit";
  const detailedTransactionIconColor =
    activePanel === "DetailedTransaction" ? "secondary" : "inherit";
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
          <ListItem button={true} onClick={handleItemClick("Summary")}>
            <ListItemIcon>
              <HomeIcon color={summaryIconColor} />
            </ListItemIcon>
            <ListItemText primary="Summary" />
          </ListItem>
          <ListItem
            button={true}
            onClick={handleItemClick("DetailedTransaction")}
          >
            <ListItemIcon>
              <ZoomInIcon color={detailedTransactionIconColor} />
            </ListItemIcon>
            <ListItemText primary="Details" />
          </ListItem>
          <ListItem button={true} onClick={handleItemClick("ByCategory")}>
            <ListItemIcon>
              <CategoryIcon color={byCategoryIconColor} />
            </ListItemIcon>
            <ListItemText primary="By Category" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default withStyles(styles)(Navigation);
