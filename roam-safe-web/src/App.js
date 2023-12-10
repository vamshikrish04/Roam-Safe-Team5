import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import BookService from "./Pages/book-service";
import EmergencyService from "./Pages/emergency-service";
import Home from "./Pages/home";
import Login from "./Pages/login";
import MechanicSearch from "./Pages/mechanic-search";
import Signup from "./Pages/signup";
import VendorLogin from "./Pages/vendor-login";
import VendorSignUp from "./Pages/vendor-signup";
import MechanicSearchBooking from "./Pages/mechanic-search-booking";
import MyProfile from "./Pages/my-profile";
import TowingSignup from "./Pages/towing-signup";
import TowingLogin from "./Pages/towing-login";
import About from "./Pages/about";
import HowItWork from "./Pages/how-it-work";
import Contact from "./Pages/contact";
import TowingSearch from "./Pages/towing-search";
import TowingService from "./Pages/towing-service";
import BookingHistoryUser from "./Pages/booking-history-user";
import BookingHistoryTowing from "./Pages/booking-history-towing";
import BookingHistoryMechanic from "./Pages/booking-history-mechanic";
import ChatUser from "./Pages/chatUser";
import ChatMechanic from "./Pages/chatMechanic";
import ChatTowingUser from "./Pages/chatTowingUser";
import ChatTowingProvider from "./Pages/chatTowingProvider";
import ChatEmergencyUser from "./Pages/chatEmergencyUser";
import PaymentPageRagular from "./Pages/payment-regular";
import PaymentBreakdown from "./Pages/payment-breakdown";
import PaymentTowing from "./Pages/payment-towing";
import PaymentHistoryUser from "./Pages/payment-history-user";
import PaymentHistoryMechanic from "./Pages/payment-history-mechanic";
import PaymentHistoryTowing from "./Pages/payment-history-towing";
import ChatUserAdmin from "./Pages/chat-user-admin";
import ChatMechanicAdmin from "./Pages/chat-mechanic-admin";
import ChatTowingAdmin from "./Pages/chat-towing-admin";
import BookingHistoryRagular from "./Pages/booking-history-ragular";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-work" element={<HowItWork />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/vendor-signup" element={<VendorSignUp />} />
          <Route path="/vendor-Login" element={<VendorLogin />} />
          <Route path="/towing-signup" element={<TowingSignup />} />
          <Route path="/towing-login" element={<TowingLogin />} />
          <Route path="/emergency-service/:id" element={<EmergencyService />} />
          <Route path="/book-service/:id" element={<BookService />} />
          <Route path="/mechanic-search" element={<MechanicSearch />} />
          <Route path="/towing-search" element={<TowingSearch />} />
          <Route path="/towing-service/:id" element={<TowingService />} />
          <Route
            path="/booking-history-user"
            element={<BookingHistoryUser />}
          />
          <Route
            path="/booking-history-towing"
            element={<BookingHistoryTowing />}
          />
          <Route
            path="/booking-history-mechanic"
            element={<BookingHistoryMechanic />}
          />
          <Route
            path="/mechanic-search-book"
            element={<MechanicSearchBooking />}
          />
          <Route path="/chat/:clientId" element={<ChatUser />} />
          <Route path="/chat-mechanic/:clientId" element={<ChatMechanic />} />
          <Route
            path="/chat-towing-user/:clientId"
            element={<ChatTowingUser />}
          />
          <Route
            path="/chat-towing-provider/:clientId"
            element={<ChatTowingProvider />}
          />
          <Route
            path="/chat-emergency-user/:clientId"
            element={<ChatEmergencyUser />}
          />
          <Route
            path="/payment-regular-service/:userId/:mechId/:bookingId"
            element={<PaymentPageRagular />}
          />
          <Route
            path="/payment-breakdown-service/:userId/:mechId/:bookingId"
            element={<PaymentBreakdown />}
          />
          <Route
            path="/payment-towing-service/:userId/:towingId/:bookingId"
            element={<PaymentTowing />}
          />
          <Route
            path="/payment-history-user"
            element={<PaymentHistoryUser />}
          />
          <Route
            path="/payment-history-mechanic"
            element={<PaymentHistoryMechanic />}
          />
          <Route
            path="/payment-history-towing"
            element={<PaymentHistoryTowing />}
          />
          <Route path="/chat-user-admin" element={<ChatUserAdmin />} />
          <Route path="/chat-mechanic-admin" element={<ChatMechanicAdmin />} />
          <Route path="/chat-towing-admin" element={<ChatTowingAdmin />} />
          <Route path="/booking-history-regular" element={<BookingHistoryRagular />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
