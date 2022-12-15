import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import AppError from "../utils/apperror.js";
import generateToken from "../utils/generateToken.js";
import ApiFeatures from "../utils/apifeatures.js";

const authUser = asyncHandler(async (req, res, next) => {
  const { userUsername, userPassword } = req.body;
  if (!userUsername && !userPassword) {
    return next(new AppError("Please provide a username and password", 400));
  }

  if (!userUsername) {
    return next(new AppError("Please provide a username", 400));
  }

  if (!userPassword) {
    return next(new AppError("Please provide a password", 400));
  }

  const user = await User.findOne({ userUsername }).select("+userPassword");

  if (!user || !(await user.correctPassword(userPassword, user.userPassword))) {
    return next(new AppError("Invalid username or password", 401));
  } else {
    res.json({
      _id: user._id,
      userFirstName: user.userFirstName,
      userLastName: user.userLastName,
      userAddress: user.userAddress,
      userUsername: user.username,
      userRole: user.userRole,
      token: generateToken(user._id),
    });
  }
});

const registerUser = asyncHandler(async (req, res, next) => {
  const {
    userFirstName,
    userLastName,
    userAddress,
    userUsername,
    userPassword,
    userRole,
  } = req.body;

  const userExist = await User.findOne({ userUsername });
  if (userExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  const user = await User.create({
    userFirstName,
    userLastName,
    userAddress,
    userUsername,
    userPassword,
    userRole,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      userFirstName: user.userFirstName,
      userLastName: user.userLastName,
      userAddress: user.userAddress,
      userUsername: user.userUsername,
      userPassword: user.userPassword,
      userRole: user.userRole,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const features = new ApiFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const users = await features.query;
  if (!users) {
    return next(new AppError("User Does Not Exist", 404));
  }
  return res.status(200).json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User Removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, registerUser, getUsers, getUserById, deleteUser };
