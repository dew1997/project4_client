import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signup } from "../../actions/auth";
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (values: any) => {
    // @ts-ignore
    dispatch(signup(values, navigate));
  };
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    repeatPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
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
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  repeatPassword: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => {
                  return (
                    <Form className="mt-8 grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block mt-3 font-semibold">
                          first name
                        </label>
                        <Field
                          type="firstName"
                          name="firstName"
                          placeholder="First Name"
                          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        />
                        <ErrorMessage name="firstName" component="div" />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block mt-3 font-semibold">
                          last name
                        </label>
                        <Field
                          type="lastName"
                          name="lastName"
                          placeholder="Last Name"
                          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        />
                        <ErrorMessage name="lastName" component="div" />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">
                          {" "}
                          email
                        </label>
                        <Field
                          type="email"
                          name="email"
                          placeholder="Email"
                          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        />
                        <ErrorMessage name="email" component="div" />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block mt-3 font-semibold">
                          password
                        </label>
                        <Field
                          type="password"
                          name="password"
                          placeholder="Password"
                          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        />
                        <ErrorMessage name="password" component="div" />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block mt-3 font-semibold">
                          Repeat password
                        </label>
                        <Field
                          type="password"
                          name="repeatPassword"
                          placeholder="Repeat password"
                          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        />
                        <ErrorMessage name="repeatPassword" component="div" />
                      </div>
                      <button
                        className="mt-4 bg-indigo-500 text-white py-2 px-2 rounded-lg"
                        type="submit"
                      >
                        Sign up
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
