import UsersPage from "views/Users/Users";
import TeamsPage from "views/Teams/Teams.js";
import MyTeamPage from "views/Teams/MyTeam";
import Objectives from "@material-ui/icons/DoneAll";
import DashboardPage from "views/Dashboard/Dashboard.js";
import AssignedTasksPage from "views/Tasks/AssignedTasksPage";
import StrategicObjectives from "views/Objectives/Objectives";
import KPIsPage from "views/KPI/kpi";
import MyKpis from "views/KPI/mykpi"; 
import UserProfile from "views/UserProfile/UserProfile";
import UserDashboard from "views/Dashboard/UserDashboard";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRange from "@material-ui/icons/DateRange";
import MyTeamIcon from "@material-ui/icons/PeopleAltRounded";
import PersonAdd from "@material-ui/icons/PersonAdd";
import { PersonOutline } from "@material-ui/icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    rtlName: "لوحة القيادة",
    icon: PersonAdd,
    component: UsersPage,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Teams",
    rtlName: "صفحات",
    icon: MyTeamIcon,
    state: "pageCollapse",
    views: [
      {
        path: "/teams",
        name: "All Teams",
        rtlName: "عالتسعير",
        mini: "T",
        rtlMini: "ع",
        component: TeamsPage,
        layout: "/admin",
      },
      {
        path: "/user-team",
        name: "My Team",
        rtlName: "عالتسعير",
        mini: "TM",
        rtlMini: "ع",
        component: MyTeamPage,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "KPIS",
    rtlName: "صفحات",
    icon: "content_paste",
    state: "tablesCollapse",
    views: [
      {
        path: "/kpis",
        name: "KPIS",
        rtlName: "عالتسعير",
        mini: "K",
        rtlMini: "ع",
        component: KPIsPage,
        layout: "/admin",
      },
      {
        path: "/user-kpis",
        name: "My KPIS",
        rtlName: "عالتسعير",
        mini: "KM",
        rtlMini: "ع",
        component: MyKpis,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/strategic-objectives",
    name: "Strategic Objectives",
    rtlName: "الحاجيات",
    icon: Objectives,
    component: StrategicObjectives,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "MAS",
    rtlName: "صفحات",
    icon: DateRange,
    state: "formsCollapse",
    views: [
      {
        path: "/shared-tasks",
        name: "Assigned Tasks",
        rtlName: "عالتسعير",
        mini: "TM",
        rtlMini: "ع",
        component: AssignedTasksPage,
        layout: "/admin",
      }
    ],
  },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "التقويم",
    icon: PersonOutline,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/user-dashboard/:id",
    name: "",
    rtlName: "التقويم",
    mini: ".",
    component: UserDashboard,
    layout: "/admin",
  },
];
export default dashRoutes;
