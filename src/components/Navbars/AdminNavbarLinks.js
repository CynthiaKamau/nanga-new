import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import classNames from "classnames";
import PropTypes from "prop-types";
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";
import { logout } from "actions/auth";
import Avatar from "../../assets/img/default-avatar.png";
import Notifications from "@material-ui/icons/Notifications";
import { getUser } from "actions/auth";
import { getUnassignedTasks, getRejectedTasks, getAssignedTasks } from "actions/tasks";
import { List,ListItem, ListItemText, Divider } from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const { user : currentUser } = useSelector(state => state.auth);
  const { myuser } = useSelector(state => state.auth);
  const { items, unassigned_items, unassigned_items_error, rejected_items, rejected_items_error } = useSelector(state => state.task);

  console.log("unassigned_items_error", unassigned_items_error)
  console.log("unassigned_items", unassigned_items)
  console.log("rejected_items_error", rejected_items_error)
  console.log("rejected_items", rejected_items)
  console.log("items", items )

  const dispatch = useDispatch();
  const history = useHistory();
  const [openProfile, setOpenProfile] = React.useState(null);
  const [avatar, setAvatar] = useState("")
  const [name, setName] = useState("");
  const classes = useStyles();
  const { rtlActive } = props;
  const [openNotification, setOpenNotification] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  console.log("selected index", selectedIndex);

  useEffect(() => {
    dispatch(getUser(currentUser.id));
    dispatch(getUnassignedTasks(currentUser.id));
    dispatch(getRejectedTasks(currentUser.id));
    dispatch(getAssignedTasks(currentUser.id))
  }, []);

  useEffect(() => {
    if(myuser) {
      setName(myuser.fullnames);
      setAvatar(myuser.userPicture);
    }
    
  }, [myuser]);

  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };

  const handleOnClickAssigned = () => {
    if(currentUser.role_id === 0) {
      history.push('/admin/shared-tasks')
    } else {
      history.push('/user/shared-tasks')
    }
  }

  // const handleOnClickRejected = () => {
  //   if(currentUser.role_id === 0) {
  //     history.push('/admin/strategic-objectives')
  //   } else {
  //     history.push('/user/strategic-objectives')
  //   }
  // }

  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover, {
    [classes.dropdownItemRTL]: rtlActive,
  });
  const wrapper = classNames({
    [classes.wrapperRTL]: rtlActive,
  });
  const managerClasses = classNames({
    [classes.managerClasses]: true,
  });

  const logoutHandler = () => {
    dispatch(logout)
    history.push('/')
    // Also the custom logic like for the rest of the logout handler
  }

  const handleClickProf = () => {
    if(currentUser.role_id == 0) {
      history.push('/admin/user-profile')
    } else {
      history.push('/user/user-profile')
    }
  }

  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  const flexContainer = {
    padding: '10px',
    borderRadius: '1rem',
    border: '1px solid green',
    outline: 'none'
  };
  
  return (
    <div className={wrapper}>

      <div className={managerClasses} style={{ marginRight : '280px'}}>
        <Button
          color="transparent"
          justIcon
          aria-label="Notifications"
          aria-owns={openNotification ? "notification-menu-list" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : "",
          }}
        >
          <Notifications
            className={
              classes.headerLinksSvg +
              " " +
              (rtlActive
                ? classes.links + " " + classes.linksRTL
                : classes.links)
            }
          />
          <span className={classes.notifications}>{unassigned_items && (unassigned_items.length)}</span>
          <Hidden mdUp implementation="css">
            <span
              onClick={handleClickNotification}
              className={classes.linkText}
            >
              {rtlActive ? "إعلام" : "Notification"}
            </span>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openNotification,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true,
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list"
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    <h5 style={{ fontWeight : 'bold', marginLeft : '1rem'}}>New Assigned MAS </h5>

                    {unassigned_items == null || unassigned_items == undefined ? (
                      <p>You have no new assigned MAS.</p>
                    ) : unassigned_items ? (unassigned_items.map((detail, index) => {
                      return (<MenuItem key={index}
                        onClick={handleOnClickAssigned}
                        className={dropdownItem}
                      >
                        {rtlActive
                          ? "شعار إعلان الأرضية قد ذلك"
                          : detail.description}
                      </MenuItem>)
                    })) : null}

                     <h5 style={{ fontWeight : 'bold', marginLeft : '1rem'}}>Rejected MAS</h5>

                    {rejected_items == null || rejected_items == undefined ? (
                      <p>You have no rejected MAS.</p>
                    ) : rejected_items ? (rejected_items.map((detail, index) => {
                      if(selectedIndex === index) {
                        return( <div><Divider/><List style={flexContainer}>
                            <ListItem >
                              <ListItemText> Title :  {detail.description}</ListItemText>
                            </ListItem>
                            <ListItem>  
                              <ListItemText> Assigner : {detail.assigner_fullnames} </ListItemText>
                            </ListItem>
                            <ListItem>  
                              <ListItemText> Status : {detail.status}</ListItemText>
                            </ListItem>
                            <ListItem>  
                              <ListItemText> Reason : {detail.reason} </ListItemText>
                            </ListItem>
                          </List> <Divider/></div>)
                      } else {
                        return( <MenuItem key={index} currentIndex={index}
                          onClick={() => {handleCloseNotification; setSelectedIndex(selectedIndex => selectedIndex === index ? null : index)}}
                          className={dropdownItem}
                          >
                          {rtlActive
                            ? "شعار إعلان الأرضية قد ذلك"
                            : (detail.description)}
                        </MenuItem>)
                      }
                      
                    })) : null}  
                  </MenuList>    
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      <div className={managerClasses}>
        <Button
          color="transparent"
          aria-label="Person"
          justIcon
          aria-owns={openProfile ? "profile-menu-list" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : "",
          }}
        >
          <p className="classes.top classes.search" style={{ marginRight: '30px', fontWeight: 'bold' }}>{ name} </p>

          {currentUser ? (
              <div style={{ display: 'inline' }}>
                  { avatar === null || avatar === undefined || avatar == "null" ? (
                      <img src={Avatar} alt={name}  style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '50%', marginRight: '250px', marginTop: '35px'}} />

                  ) : avatar != null ? (
                      <img src={avatar}
                      alt={name}  style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '50%', marginRight: '250px', marginTop: '35px'}} />
                  ) : null}
              </div>
              
          ) : null}

          <Hidden mdUp implementation="css">
            <span onClick={handleClickProfile} className={classes.linkText}>
              {rtlActive ? "الملف الشخصي" : "Profile"}
            </span>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openProfile,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true,
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list"
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={() => {handleCloseProfile(); handleClickProf()}}
                      className={dropdownItem}
                    >
                      {rtlActive ? "الملف الشخصي" : "Profile"}
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      onClick={() => {handleCloseProfile(); logoutHandler()}}
                      className={dropdownItem}
                    >
                      {rtlActive ? "الخروج" : "Log out"}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

HeaderLinks.propTypes = {
  rtlActive: PropTypes.bool,
};
