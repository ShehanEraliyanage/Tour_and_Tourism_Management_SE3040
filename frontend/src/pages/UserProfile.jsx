import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { updatedUser } from "../controllers/User";

import "../styles/user-profile.css";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  // Update the useState calls to initialize with the respective values
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [hotelName, setHotelName] = useState(user.hotelname);
  const [hotelLocation, setHotelLocation] = useState(user.hotellocation);
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [bookingData, setBookingData] = useState([]);

  console.log(user.username);

  useEffect(() => {
    setUserDetails(user);
  }, [user]);

  const handleEditClick = () => {
    setIsEditMode(true);
    setUsername(user.username);
    setEmail(user.email);
    setHotelName(user.hotelname);
    setHotelLocation(user.hotellocation);
  };

  const handleSaveClick = async (id) => {
    setIsEditMode(false);

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to change Employee details!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((res) => {
      if (res.value === true) {
        updatedUser({
          _id: id,
          username,
          email,
          hotelname: hotelName,
          hotellocation: hotelLocation,
        }).then((res) => {
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Updated!",
              text: "User details updated successfully!",
              confirmButtonText: "OK",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong!",
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        });
      }
    });
  };

  const handleBookingsClick = () => {
    setShowBookingsModal(true);
  };

  const fetchBookingData = async () => {};

  const closeModal = () => {
    setShowBookingsModal(false);
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <form className="profile-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={!isEditMode}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!isEditMode}
        />

        {user.username === "hotel" && (
          <>
            <label htmlFor="hotelName">Hotel Name:</label>
            <input
              type="text"
              id="hotelName"
              name="hotelName"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              disabled={!isEditMode}
            />

            <label htmlFor="hotelLocation">Hotel Location:</label>
            <input
              type="text"
              id="hotelLocation"
              name="hotelLocation"
              value={hotelLocation}
              onChange={(e) => setHotelLocation(e.target.value)}
              disabled={!isEditMode}
            />
          </>
        )}

        {isEditMode ? (
          <button type="button" onClick={() => handleSaveClick(user._id)}>
            Save
          </button>
        ) : (
          <button type="button" onClick={handleEditClick}>
            Edit
          </button>
        )}

        {user.username === "shehan" && (
          <Link to="/userBook">
            <button type="button">Bookings</button>
          </Link>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
