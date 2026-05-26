import DashboardIcon from "@mui/icons-material/Dashboard";
import {AppProvider} from "@toolpad/core/AppProvider";
import {DashboardLayout} from "@toolpad/core/DashboardLayout";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {createTheme} from "@mui/material/styles";

import ApartmentIcon from "@mui/icons-material/Apartment";
import PolicyIcon from "@mui/icons-material/Policy";
import CategoryIcon from "@mui/icons-material/Category";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import ReportIcon from "@mui/icons-material/Report";
import LoginIcon from "@mui/icons-material/Login";
import {useAuth} from "../context/AuthContext";
import GetNavigation from "./GetNavigation";

const theme = createTheme({
  palette: {
    mode: "light", // force mode
  },
});

function Layout() {
  const {user} = useAuth();
  const NAVIGATION = GetNavigation(user);

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
      theme={theme}
      branding={{title: "Compliance analysis", logo: <></>}}
    >
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
}

export default Layout;
