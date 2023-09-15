import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/dashboard";
import LoginPage from "./Pages/login";
import Services from "./Pages/services";
import Model from "./Pages/model";
import Users from "./Pages/users";
import Mechanic from "./Pages/mechanic";
import MechanicDetail from "./Component/MechanicDetail";
import Towing from "./Pages/towing";
import TowingDetail from "./Component/TowingDetail";
import Contact from "./Pages/contact";
import ChatAll from "./Pages/chat-all";
import ChatUserAdmin from "./Pages/chat-admin-user";
import ChatMechanicAdmin from "./Pages/chat-admin-mechanic";
import ChatTowingAdmin from "./Pages/chat-admin-towing";


function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/model" element={<Model />} />
          <Route path="/users" element={<Users />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mechanics" element={<Mechanic />} />
          <Route path="/towing" element={<Towing />} />
          <Route path="/mechanics-detail/:id" element={<MechanicDetail />} />
          <Route path="/towing-detail/:id" element={<TowingDetail />} />
          <Route path="/chat-all" element={<ChatAll />} />
          <Route path="/chat-admin-user/:id" element={<ChatUserAdmin />} />
          <Route
            path="/chat-admin-mechanic/:id"
            element={<ChatMechanicAdmin />}
          />
          <Route
            path="/chat-admin-towing/:id"
            element={<ChatTowingAdmin />}
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
