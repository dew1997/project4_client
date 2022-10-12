import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Login from "./Login";
import Signup from "./Signup";
const Auth = () => {
  const [isSignup, setIsSignUp] = useState(false);

  const switchMode = () => {
    setIsSignUp(!isSignup);
  };
  return (
    <div>
      {isSignup ? (
        <Signup />
      ) : (
        <div>
          <Login />
        </div>
      )}
      <button
        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        onClick={switchMode}
      >
        {isSignup
          ? "Already have an account? Sign In "
          : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};
export default Auth;
