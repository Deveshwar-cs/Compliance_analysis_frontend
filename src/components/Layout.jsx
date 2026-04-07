import DashboardIcon from "@mui/icons-material/Dashboard";
import {AppProvider} from "@toolpad/core/AppProvider";
import {DashboardLayout} from "@toolpad/core/DashboardLayout";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PolicyIcon from "@mui/icons-material/Policy";
import CategoryIcon from "@mui/icons-material/Category";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import ReportIcon from "@mui/icons-material/Report";
import LoginIcon from "@mui/icons-material/Login";

const NAVIGATION = [
  {
    segment: "",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "organizations",
    title: "Organizations",
    icon: <ApartmentIcon />,
  },
  {
    segment: "rules-and-policies",
    title: "Rules & Policies",
    icon: <PolicyIcon />,
  },
  {
    segment: "products",
    title: "Products",
    icon: <CategoryIcon />,
  },
  {
    segment: "complianceEngine",
    title: "Compliance Engine",
    icon: <AssuredWorkloadIcon />,
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <ReportIcon />,
  },
  {
    kind: "divider",
  },
  {
    segment: "register",
    title: "Register",
    icon: <LoginIcon />,
  },
];

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const router = {
    pathname: location.pathname,
    navigate: (path) => navigate(path),
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      branding={{title: "Compliance analysis", logo: <></>}}
    >
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
}

export default Layout;
