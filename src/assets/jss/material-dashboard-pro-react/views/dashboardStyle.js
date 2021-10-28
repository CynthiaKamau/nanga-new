import {
  successColor,
  tooltip,
  cardTitle,
  grayColor,
} from "assets/jss/material-dashboard-pro-react.js";

import hoverCardStyle from "assets/jss/material-dashboard-pro-react/hoverCardStyle.js";

const dashboardStyle = {
  ...hoverCardStyle,
  tooltip,
  cardTitle: {
    ...cardTitle,
    marginTop: "0px",
    marginBottom: "3px",
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
  cardProductTitle: {
    ...cardTitle,
    marginTop: "0px",
    marginBottom: "3px",
    textAlign: "center",
  },
  cardCategory: {
    color: grayColor[0],
    fontSize: "14px",
    paddingTop: "10px",
    marginBottom: "0",
    marginTop: "0",
    margin: "0",
  },
  cardProductDesciprion: {
    textAlign: "center",
    color: grayColor[0],
  },
  stats: {
    color: grayColor[0],
    fontSize: "12px",
    lineHeight: "22px",
    display: "inline-flex",
    "& svg": {
      position: "relative",
      top: "4px",
      width: "16px",
      height: "16px",
      marginRight: "3px",
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      position: "relative",
      top: "4px",
      fontSize: "16px",
      marginRight: "3px",
    },
  },
  productStats: {
    paddingTop: "7px",
    paddingBottom: "7px",
    margin: "0",
  },
  successText: {
    color: successColor[0],
  },
  upArrowCardCategory: {
    width: 14,
    height: 14,
  },
  underChartIcons: {
    width: "17px",
    height: "17px",
  },
  price: {
    color: "inherit",
    "& h4": {
      marginBottom: "0px",
      marginTop: "0px",
    },
  },
  iconAdd: {
    width: '100px',
    height: '100px'
  },
  iconBottom: {
    width: '60px',
    height: '60px'
  },
  cardFooter: {
    justifyContent: 'center',
    backgroundColor: '#e6f4de'
  },
  cardBody: {
    display: 'flex',
    flexWirection: 'wrap',
    flexDirection: ''
  },
  cardBodyRed: {
    borderLeft: ' solid 5px red'
  },
  cardBodyGreen: {
    borderLeft: ' solid 5px #39af56'
  },
  textGreen: {
    color: '#39af56',
    fontWeight: 'bold'
  },
  textBold: {
    fontWeight: 'bold'
  },
  cardGrey: {
    backgroundColor: "#9FA4AA"
  },
  textInput: {
    marginBottom: '15px'
  }
};

export default dashboardStyle;
