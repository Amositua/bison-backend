import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js';
import generateToken from "../utils/generateToken.js";
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();

// Set up the NodeMailer transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// REGISTER NEW USER
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    address,
    gender,
    dob,
    educationLevel,
    fieldOfStudy,
    professionalTitle,
    howDidYouKnow
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    phone,
    address,
    gender,
    dob,
    educationLevel,
    fieldOfStudy,
    professionalTitle,
    howDidYouKnow
  });

  if (user) {
    generateToken(res, user._id);

    // Send confirmation email to the user
    const mailOptions = {
      from: 'Ebison <amosomohodion@gmail.com>',  // sender address
      to: email,                     // receiver address (user's email)
      subject: 'Registration Successful', // email subject
      text: `Dear ${name},\n\nThank you for registering! Your registration was successful.\n\nBest regards,\nThe Team` // email body
    };

    try {
      await transporter.sendMail(mailOptions); // Await the email sending
      console.log('Email sent successfully.');


      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
        dob: user.dob,
        educationLevel: user.educationLevel,
        fieldOfStudy: user.fieldOfStudy,
        professionalTitle: user.professionalTitle,
        howDidYouKnow: user.howDidYouKnow,
        isAdmin: user.isAdmin,
        message: 'Successful Registration'
      });
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      res.status(500).json({ error: 'Registration successful but email could not be sent.' });
    }
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }

  // Send the email
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log(error);
  //     return res.status(500).json({ error: 'Failed to send confirmation email.' });
  //   }
  //   console.log('Email sent: ' + info.response);
  // });

  // Return a success response
  // res.status(200).json({ message: 'Registration successful! A confirmation email has been sent.' });


});

// GET ALL USER
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});







//  LOGOUT USER
// const logoutUser = (req, res) => {
//     res.clearCookie('jwt');
//     res.status(200).json({ message: 'Logged out successfully' });
//   };

//   const logoutUser = asyncHandler(async (req, res) => {
//     res.cookie('jwt', '', {
//         httpOnly: true,
//         expires: new Date(0),
//     });
//     res.status(200).json({ message: 'Logged out successfully' });
//   });

// LOGIN USER
// const authUser = asyncHandler(async (req, res) => {
//     console.log(req.body);
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//         generateToken(res, user._id);

//         res.status(200).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             isAdmin: user.isAdmin,
//         });
//     } else {
//         res.status(401);
//         throw new Error('Invalid email or password');
//     }
// });


// GET USER BY ID
// UPDATE USER
// DELETE USER

// GET USER PROFILE
// const getUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//     });
//   } else {
//     res.status(404);
//     throw new Error('User not found');
//   }
// });

// // UPDATE USER PROFILE
// const updateUserProfile = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id);

//     if (user) {
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;

//       if (req.body.password) {
//         user.password = req.body.password;
//       }

//       const updatedUser = await user.save();

//       res.json({
//         _id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         isAdmin: updatedUser.isAdmin,
//       });
//     } else {
//       res.status(404);
//       throw new Error('User not found');
//     }
//   });

export {
  // authUser,
  registerUser,
  // logoutUser,
  // getUserProfile,
  // updateUserProfile,
  getUsers,
  // deleteUser,
  // getUserById,
  // updateUser,
};
