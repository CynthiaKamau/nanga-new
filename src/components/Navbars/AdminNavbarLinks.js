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
import Divider from "@material-ui/core/Divider";
import { logout } from "actions/auth";
import Avatar from "../../assets/img/default-avatar.png";
import { getUser } from "actions/auth";

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const { user : currentUser } = useSelector(state => state.auth);
  const { myuser } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const history = useHistory();

  const [avatar, setAvatar] = useState("")
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getUser(currentUser.id));
  }, []);

  useEffect(() => {
    if(myuser) {
      setName(myuser.fullnames);
      setAvatar(myuser.userPicture);
    }
    
  }, [myuser]);

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

  const [openProfile, setOpenProfile] = React.useState(null);
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
  const classes = useStyles();
  const { rtlActive } = props;

  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover, {
    [classes.dropdownItemRTL]: rtlActive,
  });
  const wrapper = classNames({
    [classes.wrapperRTL]: rtlActive,
  });
  const managerClasses = classNames({
    [classes.managerClasses]: true,
  });
  return (
    <div className={wrapper}>

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
                  { avatar === null || avatar === undefined ? (
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
