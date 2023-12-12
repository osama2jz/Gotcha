import "./App.css";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { MantineProvider } from "@mantine/core";
import CustomAppShell from "./components/layout/app-shell";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Drop from "./pages/Drop";
import Live from "./pages/Live";
import Claimed from "./pages/Claimed";
import Users from "./pages/Users";
import OfferTypes from "./pages/Offers";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Coupons from "./pages/Coupons";
import Signin from "./pages/Siginin";
import Park from "./pages/Park";
import Company from "./pages/Companies";
import ViewParks from "./pages/Park/ViewParks";
import ViewDrops from "./pages/Drop/ViewDrops";

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<CustomAppShell />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-park" element={<Park />} />
            <Route path="/park" element={<ViewParks />} />
            {/* <Route path="/add-drop" element={<Drop />} /> */}
            <Route path="/drop" element={<Drop />} />
            <Route path="/live" element={<Live />} />
            <Route path="/claimed" element={<Claimed />} />
            <Route path="/users" element={<Users />} />
            <Route path="/companies" element={<Company />} />
            <Route path="/offers" element={<OfferTypes />} />
            <Route path="/coupons" element={<Coupons />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
