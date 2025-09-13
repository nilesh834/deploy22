import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "./redux/slice/userSlice";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";

// PrivateRoute wrapper
const PrivateRoute = ({ children }) => {
  const { user, tokenExpiry } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenExpiry) return;

    const checkExpiry = () => {
      if (Date.now() > tokenExpiry) {
        dispatch(setLogout());
        navigate("/login", { replace: true }); // prevents back-button to protected routes
      }
    };

    checkExpiry(); // run once immediately
    const interval = setInterval(checkExpiry, 30000); // check every 30 seconds

    return () => clearInterval(interval);
  }, [tokenExpiry, dispatch, navigate]);

  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-listing"
          element={
            <PrivateRoute>
              <CreateListing />
            </PrivateRoute>
          }
        />
        <Route
          path="/listings/:listingId"
          element={
            <PrivateRoute>
              <ListingDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/listings/category/:category"
          element={
            <PrivateRoute>
              <CategoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/listings/search/:search"
          element={
            <PrivateRoute>
              <SearchPage />
            </PrivateRoute>
          }
        />

        {/* User-specific routes */}
        <Route
          path="/:userId/trips"
          element={
            <PrivateRoute>
              <TripList />
            </PrivateRoute>
          }
        />
        <Route
          path="/:userId/wishList"
          element={
            <PrivateRoute>
              <WishList />
            </PrivateRoute>
          }
        />
        <Route
          path="/:userId/properties"
          element={
            <PrivateRoute>
              <PropertyList />
            </PrivateRoute>
          }
        />
        <Route
          path="/:userId/reservations"
          element={
            <PrivateRoute>
              <ReservationList />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
