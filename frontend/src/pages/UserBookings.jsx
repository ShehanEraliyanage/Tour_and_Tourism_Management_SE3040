import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { updatedUser } from "../controllers/User";

import "../styles/user-profile.css";
import { getSingleBooking } from "../controllers/Booking";

const UserBooking = () => {
  const { user } = useContext(AuthContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [booking, setBooking] = useState({});

  // Update the useState calls to initialize with the respective values
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [hotelName, setHotelName] = useState(user.hotelname);
  const [hotelLocation, setHotelLocation] = useState(user.hotellocation);

  console.log(booking.fullName);

  useEffect(() => {
    bookDetails();
  }, [user]);

  const bookDetails = async () => {
    try {
      const bookdata = await getSingleBooking(user._id);
      setBooking(bookdata);
    } catch (error) {}
  };

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

  return (
    <div className="profile-container">
      <h2>User Booking</h2>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Guest Size</th>
            <th>Guide Name</th>
            <th>Phone</th>
            <th>Tour Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{booking.fullName}</td>
            <td>{booking.guestSize}</td>
            <td>{booking.guideName}</td>
            <td>{booking.phone}</td>
            <td>{booking.tourName}</td>
            <td>
              {isEditMode ? (
                <button type="button" onClick={() => handleSaveClick(user._id)}>
                  Update
                </button>
              ) : (
                <button type="button" onClick={handleEditClick}>
                  Edit
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserBooking;
