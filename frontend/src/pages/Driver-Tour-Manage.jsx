import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import "../styles/manage-driver.css";
import "../styles/home.css";
import { reactBaseURL } from "../utils/config";

import { AuthContext } from "../context/AuthContext";

import { getAllpendingBookings } from "../controllers/Booking.js";
import { getSingleVehicle, updateVehicle } from "../controllers/Vehicle.js";

const DriverTourView = () => {
  const { user } = useContext(AuthContext);

  const [tours, setTours] = useState([]);
  const [vehicle, setVehicle] = useState({});
  const [newVehicle, setNewVehicle] = useState({});
  const [modal, setModal] = useState(false);

  console.log(newVehicle);

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const bookingData = await getAllpendingBookings();
      setTours(bookingData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

  const fetchVehicle = async () => {
    try {
      const vehicleData = await getSingleVehicle(user._id);
      setVehicle(vehicleData);
      setNewVehicle(vehicleData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle((prevVehicle) => ({
      ...prevVehicle,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    console.log("sasasasaas");
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to change Vehicle details!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((res) => {
      if (res.value === true) {
        updateVehicle({
          _id: newVehicle._id,
          number: newVehicle.number,
          type: newVehicle.type,
          seatCapacity: newVehicle.seatCapacity,
          userID: newVehicle.userID,
          driverName: newVehicle.driverName,
        }).then((res) => {
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Updated!",
              text: "Vehicle details updated successfully!",
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
      window.location.replace(reactBaseURL + "/driver-tour-manage");
    }, 2050);
  };

  return (
    <div>
      <div>
        {modal && (
          <Modal isOpen={modal} toggle={handleModal} className="custom-modal">
            <ModalHeader toggle={handleModal} className="custom-modal-header">
              Vehicle Details
            </ModalHeader>
            <ModalBody className="custom-modal-body">
              <label className="booking-date" htmlFor="identification">
                Vehicle Type:
              </label>
              <input
                type="text"
                name="identification"
                value={newVehicle.identification || ""}
                onChange={handleInputChange}
              />
              <label className="booking-date" htmlFor="number">
                Vehicle Number:
              </label>
              <input
                type="text"
                name="number"
                value={newVehicle.number || ""}
                onChange={handleInputChange}
              />
              <label className="booking-date" htmlFor="number">
                Driver Name:
              </label>
              <p>{newVehicle.driverName}</p>
              <label className="booking-date" htmlFor="seatCapacity">
                Vehicle Capacity:
              </label>
              <input
                type="text"
                name="seatCapacity"
                value={newVehicle.seatCapacity || ""}
                onChange={handleInputChange}
              />
            </ModalBody>
            <ModalFooter className="custom-modal-footer">
              <Button
                color="primary"
                onClick={handleSave}
                className="custom-button-primary"
              >
                Save
              </Button>
              <Button
                color="secondary"
                onClick={handleModal}
                className="custom-button-secondary"
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        )}
        <h2 className="ml-5">Driver Appointment </h2>
        <section>
          <div className=" guide__links d-flex ">
            <Link to="/driver-tour-manage">
              <div className="guide__pending">Pending</div>
            </Link>
            <Link to="/driver-tour-ongoing">
              <div className="guide__onGoing">On Going</div>
            </Link>
            <Link to="/driver-tour-complete">
              <div className="guide__completed">Completed</div>
            </Link>
          </div>
        </section>
        <div className="table__div">
          <Table className="custom-table">
            <thead>
              <tr>
                <th>Tour Name</th>
                <th>Full Name</th>
                <th>Guest Size</th>
                <th>Number</th>
                <th>Vehicle number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour) => (
                <tr key={tour.id} className="table-row">
                  <td>{tour.tourName}</td>
                  <td>{tour.fullName}</td>
                  <td>{tour.guestSize}</td>
                  <td>{tour.phone}</td>
                  <td>{tour.vehicleId}</td>
                  <td>
                    <Button className="custom-button-primary">confirm</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <section>
        <div className=" Hotel__links d-flex align-items-center gap-5">
          <Link to="/add-vehicle">
            <div className="hotel__main">Add Vehicle</div>
          </Link>
          <Link>
            <div className="hotel__main" onClick={handleModal}>
              View Vehicle
            </div>
          </Link>
          <Link to="/driver-tour-manage">
            <div className="hotel__main">Appointments</div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DriverTourView;
