/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import _ from "lodash";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
// import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { AccountCircle, MoreVert, AccountBalance } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";
import { getOrganogram } from "actions/data";
import { useDispatch, useSelector } from "react-redux";

import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    display: "inline-block",
    borderRadius: 16,
  },
  expand: {
    transform: "rotate(0deg)",
    marginTop: -10,
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.short,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#ECECF4",
  },
}));

// eslint-disable-next-line react/prop-types
function Organization({ org, onCollapse, collapsed }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "account",
    drop: () => ({ name: org.roleName }, {employee: org.fullNames}),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = canDrop && isOver;
  let backgroundColor = "white";
  if (isActive) {
    backgroundColor = "#ddffd2";
  } else if (canDrop) {
    backgroundColor = "#ffeedc";
  }
  return (
    <Card
      variant="outlined"
      className={classes.root}
      ref={drop}
      style={{ backgroundColor }}
    >
      <CardHeader
        avatar={
          <Tooltip
            title={`${_.size(
              org.organizationChildRelationship
            )} Sub Profile, ${_.size(org.account)} Sub Account`}
            arrow
          >
            <Badge
              style={{ cursor: "pointer" }}
              color="secondary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              showZero
              invisible={!collapsed}
              overlap="circle"
              badgeContent={_.size(org.organizationChildRelationship)}
              onClick={onCollapse}
            >
              <Avatar className={classes.avatar}>
                <AccountCircle style={{color: '#29A15B'}} />
              </Avatar>
            </Badge>
          </Tooltip>
        }
        title={org.roleName}
        subheader={org.fullNames}
        action={
          <IconButton size="small" onClick={handleClick}>
            <MoreVert />
          </IconButton>
        }
      />

      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountCircle style={{color: '#29A15B'}} />
          </ListItemIcon>
          <ListItemText primary="Add Sub Profile" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountBalance color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Add Sub Account" />
        </MenuItem>
      </Menu>
      <IconButton
        size="small"
        onClick={onCollapse}
        className={clsx(classes.expand, {
          [classes.expandOpen]: !collapsed,
        })}
      >
        <ExpandMoreIcon />
      </IconButton>
    </Card>
  );
}
// eslint-disable-next-line react/prop-types
function Account({ a }) {
  const classes = useStyles();
  const [{ isDragging }, drag] = useDrag({
    item: { name: a.name, type: "account" },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You moved ${item.name} to ${dropResult.name}`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.4 : 1;
  return (
    <Card
      variant="outlined"
      className={classes.root}
      ref={drag}
      style={{ cursor: "pointer", opacity }}
    >
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <AccountBalance style={{color: '#29A15B'}} />
          </Avatar>
        }
        title={a.name}
        subheader={a.fullNames}
      />
    </Card>
  );
}
// function Product({ p }) {
//   const classes = useStyles();
//   return (
//     <Card variant="outlined" className={classes.root}>
//       <CardContent>
//         <Typography variant="subtitle2">{p.name}</Typography>
//         <Typography variant="subtitle3">{p.fullNames}</Typography>
//       </CardContent>
//     </Card>
//   );
// }
function Node({ o, parent }) {
  const [collapsed, setCollapsed] = React.useState(o.collapsed);
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  React.useEffect(() => {
    o.collapsed = collapsed;
  });
  const T = parent
    ? TreeNode
    : (props) => (
        <Tree
          {...props}
          lineWidth={"2px"}
          lineColor={"#bbc"}
          lineBorderRadius={"12px"}
        >
          {props.children}
        </Tree>
      );
  return collapsed ? (
    <T
      label={
        <Organization
          org={o}
          onCollapse={handleCollapse}
          collapsed={collapsed}
        />
      }
    />
  ) : (
    <T
      label={
        <Organization
          org={o}
          onCollapse={handleCollapse}
          collapsed={collapsed}
        />
      }
    >
      {_.map(o.yourTeam, (a) => (
        <TreeNode label={<Account a={a} />}>
          {/* <TreeNode label={<Product p={a.subTeam} />} /> */}
        </TreeNode>
      ))}
      {_.map(o.organizationChildRelationship, (c) => (
        <Node o={c} parent={o} />
      ))}
    </T>
  );
}
const theme = createMuiTheme({
  palette: {
    background: "#ECECF4",
  },
  fontFamily: "Roboto, sans-serif",
});

export default function Organogram() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrganogram())
  }, []);
  
  const { organogram : organization } = useSelector(state => state.data );
  
  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor="background" padding={4} height="80vh" style={{ overflow: "hidden", overflowX: "scroll"}}>
        <DndProvider backend={HTML5Backend}>
          <Node o={organization} />
        </DndProvider>
      </Box>
    </ThemeProvider>
  );
}