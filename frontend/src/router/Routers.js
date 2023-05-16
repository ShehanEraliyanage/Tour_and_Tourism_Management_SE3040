import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//import Pages
import Home from "./../pages/Home";
import HomeHotel from "../pages/HomeHotel";
import HomeGiude from "../pages/HomeHotel";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import SearchResultList from "./../pages/SearchResultList";
import TourDetails from "./../pages/TourDetails";
import Tours from "./../pages/Tours";
import AddTour from "../pages/Add-Tour";
import AddVehicle from "../pages/Add-Vehicle";
import ViewTours from "../pages/View-Tours";
import ManageBookings from "../pages/Manage-Bookings";
import GiudeTourView from "../pages/Guide-Tour-Manage";
import DriverTourView from "../pages/Driver-Tour-Manage";
import ManageBookingsTourist from "../pages/Manage-Tourist-Booking";
import UserProfile from "../pages/UserProfile";
import { ThankYou } from "../pages/ThankYou";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home-Hotel" element={<HomeHotel />} />
      <Route path="/home-Giude" element={<HomeGiude />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/tours/search" element={<SearchResultList />} />
      <Route path="/add-tour" element={<AddTour />} />
      <Route path="/add-vehicle" element={<AddVehicle />} />
      <Route path="/view-tours" element={<ViewTours />} />
      <Route path="/guide-tour-manage" element={<GiudeTourView />} />
      <Route path="/manage-bookings" element={<ManageBookings />} />
      <Route path="/driver-tour-manage" element={<DriverTourView />} />
      <Route
        path="/tourist-manage-booking"
        element={<ManageBookingsTourist />}
      />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  );
};
export default Routers;
