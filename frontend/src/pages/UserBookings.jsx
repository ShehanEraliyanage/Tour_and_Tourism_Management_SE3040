import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { updatedUser } from "../controllers/User";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { reactBaseURL } from "../utils/config";
import "../styles/view-tours.css";
import "../styles/home.css";
import "../styles/user-profile.css";
import {
  getSingleBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/Booking";

const UserBooking = () => {
  const { user } = useContext(AuthContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [booking, setBooking] = useState({});
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [hotelName, setHotelName] = useState(user.hotelname);
  const [hotelLocation, setHotelLocation] = useState(user.hotellocation);
  const [modal, setModal] = useState(false);
  const [editedBook, setEditedBook] = useState({});

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    bookDetails();
  }, [user]);
  console.log(booking);
  const bookDetails = async () => {
    try {
      const bookdata = await getSingleBooking(user._id);
      setBooking(bookdata);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    setUsername(user.username);
    setEmail(user.email);
    setHotelName(user.hotelname);
    setHotelLocation(user.hotellocation);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleEdit = (id) => {
    setEditedBook((prevBook) => ({
      ...prevBook,
      fullName: booking.fullName,
      guestSize: booking.guestSize,
      guideName: booking.guideName,
      phone: booking.phone,
      tourName: booking.tourName,
    }));
    toggleModal();
  };

  const handleSave = async () => {
    console.log(editedBook);

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
        updateBooking({
          _id: booking._id,
          fullName: editedBook.fullName,
          guestSize: editedBook.guestSize,
          guideName: editedBook.guideName,
          phone: editedBook.phone,
          tourName: editedBook.tourName,
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
    setTimeout(() => {
      window.location.replace(reactBaseURL + "/userBook");
    }, 2050);
  };

  const handleDelete = async (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value === true) {
        deleteBooking(id).then((res) => {
          if (res) {
            Swal.fire({
              title: "Success!",
              text: "Your file has been deleted",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              window.location.reload();
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  const handleCancel = () => {
    toggleModal();
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
    <>
      <div className="profile-container">
        <h2>User Booking</h2>
        <div className="table__div">
          <Table className="custom-table">
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
                  <button
                    type="button"
                    className="edt_btn"
                    onClick={() => handleEdit(booking._id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="delete__button"
                    onClick={() => handleDelete(booking._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Tour</ModalHeader>
        <ModalBody>
          <div>
            <label htmlFor="edit-title">Full Name:</label>
            <input
              type="text"
              id="edit-title"
              name="fullName"
              value={editedBook.fullName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="edit-city">Guest Size:</label>
            <input
              type="text"
              id="edit-city"
              name="guestSize"
              value={editedBook.guestSize || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="edit-address">Guide Name:</label>
            <input
              type="text"
              id="edit-address"
              name="guideName"
              value={editedBook.guideName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="edit-distance">Phone:</label>
            <input
              type="number"
              id="edit-distance"
              name="phone"
              value={editedBook.phone || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="edit-price">Tour Name:</label>
            <input
              type="text"
              id="edit-price"
              name="tourName"
              value={editedBook.tourName || ""}
              onChange={handleInputChange}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default UserBooking;
