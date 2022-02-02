// import UsersPage from "views/Users/Users";
// import TeamsPage from "views/Teams/Teams.js";
// import MyTeamPage from "views/Teams/MyTeam";
import Objectives from "@material-ui/icons/DoneAll";
import DashboardPage from "views/Dashboard/Dashboard.js";
import AssignedTasksPage from "views/Tasks/AssignedTasksPage";
import StrategicObjectives from "views/Objectives/Objectives";
import KPIsPage from "views/KPI/kpi";
// import KPIsPageTest from "views/KPI/kpitest";

// import MyKpis from "views/KPI/mykpi"; 
import UserProfile from "views/UserProfile/UserProfile";
// import UserDashboard from "views/Dashboard/UserDashboard";
// import ObjectiveReport from "views/Reports/objective-report";
// import KPIReport from "views/Reports/kpi-report";

import BFC from "views/BFC/Bfc";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRange from "@material-ui/icons/DateRange";
// import MyTeamIcon from "@material-ui/icons/PeopleAltRounded";
// import PersonAdd from "@material-ui/icons/PersonAdd";
import { PersonOutline} from "@material-ui/icons";
import VerticalAlignCenterIcon from '@material-ui/icons/VerticalAlignCenter';
// import { Poll } from "@material-ui/icons";


var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: DashboardPage,
    layout: "/user",
  },
  {
    path: "/bfc",
    name: "Leadership Traits",
    rtlName: "صفحات",
    icon: "content_paste",
    component: BFC,
    layout: "/user",
  },
  {
    path: "/kpis",
    name: "KPIS",
    rtlName: "الحاجيات",
    icon: VerticalAlignCenterIcon,
    component: KPIsPage,
    layout: "/user",
  },
  {
    path: "/strategic-objectives",
    name: "Strategic Objectives",
    rtlName: "الحاجيات",
    icon: Objectives,
    component: StrategicObjectives,
    layout: "/user",
  },
  {
    path: "/shared-tasks",
    name: "Assigned MAS",
    rtlName: "صفحات",
    icon: DateRange,
    component: AssignedTasksPage,
    layout: "/user",
  },
  // {
  //   path: "/users",
  //   name: "Users",
  //   rtlName: "لوحة القيادة",
  //   icon: PersonAdd,
  //   component: UsersPage,
  //   layout: "/user",
  // },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "التقويم",
    icon: PersonOutline,
    component: UserProfile,
    layout: "/user",
  },
  // {
  //   collapse: true,
  //   name: "Teams",
  //   rtlName: "صفحات",
  //   icon: MyTeamIcon,
  //   state: "pageCollapse",
  //   views: [
  //     {
  //       path: "/teams",
  //       name: "All Teams",
  //       rtlName: "عالتسعير",
  //       mini: "T",
  //       rtlMini: "ع",
  //       component: TeamsPage,
  //       layout: "/user",
  //     },
  //     {
  //       path: "/user-team",
  //       name: "My Team",
  //       rtlName: "عالتسعير",
  //       mini: "TM",
  //       rtlMini: "ع",
  //       component: MyTeamPage,
  //       layout: "/user",
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: "Reports",
  //   rtlName: "صفحات",
  //   icon: Poll,
  //   state: "tablesCollapse",
  //   views: [
  //     {
  //       path: "/kpis-report",
  //       name: "KPI Report",
  //       rtlName: "عالتسعير",
  //       mini: "KR",
  //       rtlMini: "ع",
  //       component: KPIReport,
  //       layout: "/user",
  //     },
  //     {
  //       path: "/strategic-objectives-report",
  //       name: "Objective Report",
  //       rtlName: "عالتسعير",
  //       mini: "SR",
  //       rtlMini: "ع",
  //       component: ObjectiveReport,
  //       layout: "/user",
  //     },
  //   ],
  // },
  // {
  //   path: "/user-dashboard/:id",
  //   name: "",
  //   rtlName: "التقويم",
  //   mini: ".",
  //   component: UserDashboard,
  //   layout: "/user",
  // },
];
export default dashRoutes;
