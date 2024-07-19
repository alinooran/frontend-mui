import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import AddRequest from "./pages/addRequest";
import Requests from "./pages/requests";
import Security from "./pages/security";
import Report from "./pages/report";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/test" element={<Report />} /> */}

        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="addrequest" element={<AddRequest />} />
          <Route path="requests" element={<Requests />} />
          <Route path="report" element={<Report />} />
        </Route>
        <Route path="/security" element={<Security />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
