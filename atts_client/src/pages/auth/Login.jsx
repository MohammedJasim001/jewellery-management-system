import React, { useEffect } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../../validation/authValidation";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/input";
import Button from "../../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { resetAuthState } from "../../features/auth/authSlice";
import { loginUser } from "../../features/auth/authThunk";

const Login = () => {
    const dispatch = useDispatch()
  const navigate = useNavigate();
  const { successMessage, isSuccess, error, token, loading } = useSelector(
    (state) => state.auth
  );
  console.log(token,'token');
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('token',token)
      toast.success(successMessage);
      navigate("/");
      dispatch(resetAuthState());
    }
    if (error) {
      toast.error(error);
      console.log(error, "errror");
      dispatch(resetAuthState())
    }
  }, [isSuccess, error, navigate, successMessage,dispatch,token]);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit:(values)=>{
        dispatch(loginUser(values))
    }
  });
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100/40">
      <div className="p-8 rounded-xl shadow-md w-full bg-white max-w-md  mt-14 ">
        <h2 className="text-2xl font-bold text-center mb-6 ">
          <span className="relative inline-block z-10">
            Login
            <span className="absolute bottom-0 left-0 w-full h-1 bg-[#e29b18ea] z-[-1]"></span>
          </span>
        </h2>

        <form onSubmit={formik.handleSubmit}>
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
            {loading?"Loading..":"Login"}
          </Button>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 font-medium cursor-pointer"
            >
              Register Now
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
