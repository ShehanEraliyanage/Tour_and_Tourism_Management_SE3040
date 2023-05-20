import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);

  try {
    const savedBooking = await newBooking.save();

    res.status(200).json({
      success: true,
      message: "Booking created successfully",
      data: savedBooking,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "internal Server Error" });
  }
};

export const getBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Booking.findById(id);

    res.status(200).json({
      success: true,
      message: "Booking fetched successfully",
      data: book,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

export const getAllBooking = async (req, res) => {
  try {
    const book = await Booking.find({});
    res.send(book);
  } catch (err) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

// export const updatedBooking = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const updateTour = await Booking.findByIdAndUpdate(
//       id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Successfully updated Booking",
//       data: updateTour,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Unable to update Booking",
//     });
//   }
// };

export const updatedBooking = async (req, res) => {
  try {
    const tour = await Booking.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      {
        _id: req.body.id,
        fullName: req.body.fullName,
        guestSize: req.body.guestSize,
        guideName: req.body.guideName,
        phone: req.body.phone,
        tourName: req.body.tourName,
      },
      {
        new: true,
      }
    );

    if (user) {
      res.send({
        status: 200,
        user: user,
      });
    } else {
      res.send({
        status: 500,
        user: user,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
// export const deleteBooking = async (req, res) => {
//   const id = req.params.id;
//   try {
//     if (id) {
//       await Booking.findByIdAndDelete(id);

//       res.status(200).json({
//         success: true,
//         message: "Successfully Deleted Booking",
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Unable to delete Booking",
//     });
//   }
// };
export const deleteBooking = async (req, res) => {
  const book = await Booking.findOneAndDelete({ _id: req.body.id });
  res.send(book);
};

export const getAllpendingBookings = async (req, res) => {
  const booking = await Booking.find({ status: "pending" });
  res.send(booking);
};
export const getAllOngoingBookings = async (req, res) => {
  const booking = await Booking.find({ status: "ongoing" });
  res.send(booking);
};
export const getAllComletedBookings = async (req, res) => {
  const booking = await Booking.find({ status: "completed" });
  res.send(booking);
};

export const getSingleBooking = async (req, res) => {
  console.log("id");
  console.log(req.body.id);
  const booking = await Booking.findOne({ userId: req.body.id });
  console.log(booking);
  res.send(booking);
};
