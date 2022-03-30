import UsersPage from "views/Users/Users";
import TeamsPage from "views/Teams/Teams.js";
import MyTeamPage from "views/Teams/MyTeam";
import Objectives from "@material-ui/icons/DoneAll";
import DashboardPage from "views/Dashboard/Dashboard.js";
import AssignedTasksPage from "views/Tasks/AssignedTasksPage";
import StrategicObjectives from "views/Objectives/Objectives";
import KPIsPage from "views/KPI/kpi";
// import KPIsPageTest from "views/KPI/kpitest";

// import MyKpis from "views/KPI/mykpi"; 
import UserProfile from "views/UserProfile/UserProfile";
import UserDashboard from "views/Dashboard/UserDashboard";
import ObjectiveReport from "views/Reports/objectives-report";
import KPIReport from "views/Reports/kpi-report";
import WeeklyReport from "views/Reports/weekly-report";
import KPISnapshotReport from "views/Reports/kpi-report-snapshot";
import ObjectiveSnapshotReport from "views/Reports/objective-report-snapshot";
import UserReportDashboard from "views/Reports/user-report"
import AllAssignedTasksPage from "views/Tasks/AllAssignedTasksPage";

import BFC from "views/BFC/Bfc";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRange from "@material-ui/icons/DateRange";
import MyTeamIcon from "@material-ui/icons/PeopleAltRounded";
import PersonAdd from "@material-ui/icons/PersonAdd";
import { PersonOutline} from "@material-ui/icons";
import VerticalAlignCenterIcon from '@material-ui/icons/VerticalAlignCenter';
import PlaylistAddCheckCircleIcon from '@material-ui/icons/PlaylistAddCheckOutlined';
import Sync from '@material-ui/icons/Sync';
import { Poll } from "@material-ui/icons";


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
        path: "/admin-team",
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
    path: "/bfc",
    name: "Leadership Traits",
    rtlName: "صفحات",
    icon: "content_paste",
    component: BFC,
    layout: "/admin",
  },
  {
    path: "/kpis",
    name: "KPIS",
    rtlName: "الحاجيات",
    icon: VerticalAlignCenterIcon,
    component: KPIsPage,
    layout: "/admin",
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
    icon: PlaylistAddCheckCircleIcon,
    state: "pageCollapse",
    views: [
      {
        path: "/shared-tasks",
        name: "Assigned MAS",
        rtlName: "صفحات",
        icon: DateRange,
        component: AssignedTasksPage,
        layout: "/admin",
      },
      {
        path: "/all-assigned-tasks",
        name: "All Assigned MAS",
        rtlName: "صفحات",
        icon: Sync,
        component: AllAssignedTasksPage,
        layout: "/admin",
      },
    ]
  }, 
  {
    collapse: true,
    name: "Reports",
    rtlName: "صفحات",
    icon: Poll,
    state: "pageCollapse",
    views: [
      {
        path: "/kpis-report",
        name: "KPI Report",
        rtlName: "عالتسعير",
        mini: "KR",
        rtlMini: "ع",
        component: KPIReport,
        layout: "/admin",
      },
      {
        path: "/strategic-objectives-report",
        name: "Objective Report",
        rtlName: "عالتسعير",
        mini: "SR",
        rtlMini: "ع",
        component: ObjectiveReport,
        layout: "/admin",
      },
      {
        path: "/weekly-report",
        name: "Weekly Report",
        rtlName: "عالتسعير",
        mini: "WR",
        rtlMini: "ع",
        component: WeeklyReport,
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
  {
    path: "/user-dashboard/:id",
    name: "",
    rtlName: "التقويم",
    mini: "",
    component: UserDashboard,
    layout: "/admin",
  },
  {
    path: "/user-report/:id",
    name: "",
    rtlName: "التقويم",
    mini: "",
    component: UserReportDashboard,
    layout: "/admin",
  },
  {
    path: "/kpi-report/:id",
    name: "",
    rtlName: "التقويم",
    mini: "",
    component: KPISnapshotReport,
    layout: "/admin",
  },
  {
    path: "/objectives-report/:id",
    name: "",
    rtlName: "التقويم",
    mini: "",
    component: ObjectiveSnapshotReport,
    layout: "/admin",
  }
];
export default dashRoutes;