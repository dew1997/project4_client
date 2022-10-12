import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signin } from "../../actions/auth";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { useState } from "react";
const Login = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values: { email: string; password: string }) => {
    // @ts-ignore
    dispatch(signin(values, navigate));
  };
  const loginSchema = Yup.object().shape({
    password: Yup.string()
      // .min(8, "Too Short!")
      // .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl mx-auto text-center">
          <span className="text-2xl font-light">Login to your account</span>
          <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
            <div className="h-2 bg-indigo-400 rounded-t-md"></div>
            <div className="py-6 px-8">
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => {
                  return (
                    <Form>
                      <label className="block mt-3 font-semibold">Email</label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                      <ErrorMessage name="email" component="div" />

                      <label className="block mt-3 font-semibold">
                        {" "}
                        Password
                      </label>
                      <Field
                        type={open === false ? "password" : "text"}
                        name="password"
                        placeholder="Password"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                      <ErrorMessage name="password" component="div" />
                      {open === false ? (
                        <BsEyeSlashFill onClick={handleToggle} />
                      ) : (
                        <BsEyeFill onClick={handleToggle} />
                      )}

                      <button
                        className="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-lg"
                        type="submit"
                      >
                        Sign in
                      </button>
                    </Form>
                  );
                }}
              </Formik>
              <a href="#" className="text-sm hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
