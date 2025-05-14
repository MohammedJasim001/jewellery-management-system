import catchAsync from "../utils/catchasync.js";
import * as authServices from "../services/authServices.js";

export const userRegister = catchAsync(async (req, res) => {
  const register = await authServices.userRegister(req.body);
  res.status(201).json({ message: "Registration Successfull", user: register });
});

export const userLogin = catchAsync(async (req, res) => {
  const login = await authServices.userLogin(req.body);
  res.status(200).json({ message: "Login Successfull", user: login });
});

