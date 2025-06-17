import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthRoute } from "./components/AuthRoute";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Preferences } from "./pages/Preferences";
import { Dashboard } from "./pages/DashBorad";
import { Layout } from "./components/Layout";
import "./styles/main.css";
import "./styles/forms.css";
import "./styles/layout.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route element={<AuthRoute />}>
            <Route path="preferences" element={<Preferences />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;