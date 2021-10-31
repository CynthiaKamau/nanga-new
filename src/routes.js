import UsersPage from "views/Users/Users";
import TeamsPage from "views/Teams/Teams.js"
import Objectives from "@material-ui/icons/DoneAll";
import DashboardPage from "views/Dashboard/Dashboard.js";
import TasksPage from "views/Tasks/Tasks";
import AssignedTasksPage from "views/Tasks/AssignedTasksPage";
import StrategicObjectives from "views/Objectives/ViewObjectives";
import KPIsPage from "views/KPI/kpi"; 
import UserProfile from "views/UserProfile/UserProfile";

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
        mini: "PP",
        rtlMini: "ع",
        component: TeamsPage,
        layout: "/admin",
      },
      {
        path: "/teams",
        name: "My Team",
        rtlName: "عالتسعير",
        mini: "PP",
        rtlMini: "ع",
        component: TeamsPage,
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
        mini: "PP",
        rtlMini: "ع",
        component: KPIsPage,
        layout: "/admin",
      },
      {
        path: "/kpis",
        name: "My KPIS",
        rtlName: "عالتسعير",
        mini: "PP",
        rtlMini: "ع",
        component: KPIsPage,
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
    name: "Tasks",
    rtlName: "صفحات",
    icon: DateRange,
    state: "formsCollapse",
    views: [
      {
        path: "/tasks",
        name: "My Tasks",
        rtlName: "عالتسعير",
        mini: "PP",
        rtlMini: "ع",
        component: TasksPage,
        layout: "/admin",
      },
      {
        path: "/shared-tasks",
        name: "Assigned Tasks",
        rtlName: "عالتسعير",
        mini: "PP",
        rtlMini: "ع",
        component: AssignedTasksPage,
        layout: "/admin",
      },
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
];
export default dashRoutes;
