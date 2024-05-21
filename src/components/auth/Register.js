import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Auth.css";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div>
      <h2 className="text-xl text-gray-900 text-start ">
        Enter your wallet number{" "}
      </h2>
      <h2 className="text-sm text-gray-900 text-start ">for Signin </h2>
      <div className="mt-6">
        <PhoneInput
          country={"bd"}
          inputProps={{
            name: "Phone",
            required: true,
            //   autoFocus: true,
          }}
          isValid={(value, country) => {
            if (value.match(/(^(\+880|880))[1|3-9]{1}(\d){9}$/)) {
              // setPhoneIsValid(true);
              return true;
            } else {
              // setPhoneIsValid(false);
              return "Invalid Phone";
            }
          }}
          // onChange={(phone) => setPhone(phone)}
          required
        />
      </div>
      <div>
        <Link to="/verify-otp">
          <button className="font-mono mt-4 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-pink-500 rounded-lg ">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
