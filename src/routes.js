// import
import React from "react";

const Dashboard = React.lazy(() => import("views/Dashboard/Dashboard"));
const Tables = React.lazy(() => import("views/Dashboard/Tables"));
const Billing = React.lazy(() => import("views/Dashboard/Billing"));
const Profile = React.lazy(() => import("views/Dashboard/Profile"));
const InspectionForm = React.lazy(() => import("views/Dashboard/InspectionForm"));
const InspectorsDashboard = React.lazy(() => import("views/Dashboard/Inspectors"));
const InspectorsList = React.lazy(() => import("views/Dashboard/Inspectors/InspectorsList"));
const InspectorDetails = React.lazy(() => import("views/Dashboard/Inspectors/InspectorDetails"));
const Users = React.lazy(() => import("views/Dashboard/Users"));
const Logs = React.lazy(() => import("views/Dashboard/Logs"));
const Visits = React.lazy(() => import("views/Dashboard/Visits"));
const VisitDetails = React.lazy(() => import("views/Dashboard/Visits/VisitDetails"));
const VisitEdit = React.lazy(() => import("views/Dashboard/Visits/VisitEdit"));
const SignIn = React.lazy(() => import("views/Auth/SignIn.js"));
const SignUp = React.lazy(() => import("views/Auth/SignUp.js"));
const Verify = React.lazy(() => import("views/Auth/Verify.js"));

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
  ClipboardIcon,
} from "components/Icons/Icons";

var dashRoutes = [
  // 1. لوحة القيادة
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  // 2. لوحة المفتشين (Dashboard with map)
  {
    path: "/inspectors-dashboard",
    name: "Inspectors Dashboard",
    rtlName: "لوحة المفتشين",
    icon: <PersonIcon color="inherit" />,
    component: InspectorsDashboard,
    layout: "/admin",
  },
  // 3. إدارة المفتشين (List/Table view)
  {
    path: "/inspectors-list/:id",
    name: "Inspector Details",
    rtlName: "تفاصيل المفتش",
    component: InspectorDetails,
    layout: "/admin",
    invisible: true, // Don't show in sidebar
  },
  {
    path: "/inspectors-list",
    name: "Inspectors List",
    rtlName: "إدارة المفتشين",
    icon: <PersonIcon color="inherit" />,
    component: InspectorsList,
    layout: "/admin",
  },
  // 4. إدارة المستخدمين
  {
    path: "/users",
    name: "Users",
    rtlName: "إدارة المستخدمين",
    icon: <PersonIcon color="inherit" />,
    component: Users,
    layout: "/admin",
  },
  // 5. سجلات النظام
  {
    path: "/logs",
    name: "Logs",
    rtlName: "سجلات النظام",
    icon: <DocumentIcon color="inherit" />,
    component: Logs,
    layout: "/admin",
  },
  // 6. الزيارات التفتيشية
  {
    path: "/visits/:id/edit",
    name: "Edit Visit",
    rtlName: "تعديل الزيارة",
    component: VisitEdit,
    layout: "/admin",
    invisible: true, // Don't show in sidebar
  },
  {
    path: "/visits/:id",
    name: "Visit Details",
    rtlName: "تفاصيل الزيارة",
    component: VisitDetails,
    layout: "/admin",
    invisible: true, // Don't show in sidebar
  },
  {
    path: "/visits",
    name: "Visits",
    rtlName: "الزيارات التفتيشية",
    icon: <ClipboardIcon color="inherit" />,
    component: Visits,
    layout: "/admin",
  },
  // 7. نموذج التفتيش
  {
    path: "/inspection-form",
    name: "Inspection Form",
    rtlName: "نموذج التفتيش",
    icon: <ClipboardIcon color="inherit" />,
    component: InspectionForm,
    layout: "/admin",
    isExternal: true, // Mark as external to open in new tab
    externalPath: "/#/form/inspection"
  },
  // Hidden routes (not in sidebar)
  {
    path: "/inspection",
    name: "Inspection Form Standalone",
    rtlName: "نموذج التفتيش",
    component: InspectionForm,
    layout: "/form",
    invisible: true,
  },

  // Auth & Account Pages (hidden from sidebar)
  {
    name: "ACCOUNT PAGES",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    invisible: true,
    views: [
      {
        path: "/profile",
        name: "Profile",
        rtlName: "الملف الشخصي",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
        invisible: true,
      },
      {
        path: "/signin",
        name: "Sign In",
        rtlName: "تسجيل الدخول",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
        invisible: true,
      },
      {
        path: "/verify",
        name: "Verify",
        rtlName: "التحقق",
        icon: <DocumentIcon color="inherit" />,
        component: Verify,
        layout: "/auth",
        invisible: true,
      },
      {
        path: "/signup",
        name: "Sign Up",
        rtlName: "التسجيل",
        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: true,
        component: SignUp,
        layout: "/auth",
        invisible: true,
      },
    ],
  },
];
export default dashRoutes;
