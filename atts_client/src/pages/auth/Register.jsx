import React, { useEffect } from "react";
import { useFormik } from "formik";
import { signupSchema } from "../../validation/authValidation";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/input";
import Button from "../../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { resetAuthState } from "../../features/auth/authSlice";
import { registerUser } from "../../features/auth/authThunk";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { successMessage, isSuccess, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success(successMessage);
      navigate("/login");
      dispatch(resetAuthState());
    }
    if (error) {
      toast.error(error);
      console.log(error, "errror");
      dispatch(resetAuthState())
    }
  }, [isSuccess, error, navigate, successMessage,dispatch]);
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100/40">
      <div className="p-8 rounded-xl shadow-md w-full bg-white max-w-md  mt-14 ">
        <h2 className="text-2xl font-bold text-center mb-6 ">
          <span className="relative inline-block z-10">
            Register
            <span className="absolute bottom-0 left-0 w-full h-1 bg-[#e29b18ea] z-[-1]"></span>
          </span>
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <Input
            label="Full Name"
            name="userName"
            placeholder="Enter your name"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.userName && formik.errors.userName
                ? formik.errors.userName
                : undefined
            }
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : undefined
            }
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : undefined
            }
          />

          <Button type="submit" className="w-full">
            {loading?"Loading..":"Save"}
          </Button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-medium cursor-pointer"
            >
              Login Now
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
