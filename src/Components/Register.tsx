import axios from "axios";
import React, { useRef, useState } from "react";
import joi from "joi";
import { useNavigate } from "react-router-dom";

interface userTypes {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

const Register = () => {
  // User Object to collect user data inside it .
  const [user, setUser] = useState<userTypes>({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
  });

  // email address already exist message .
  const [emailExistenceMsg, setEmailExistenceMsg] = useState<string>("");

  // Inputs Refs
  const fNameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);

  // validation error msgs
  const [fNameMsg, setFNameMsg] = useState<string>("");
  const [emailMsg, setEmailMsg] = useState<string>("");

  // loading icons
  const [loading, isLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // a function that takes the input value and drop it off in the user object on each property .
  const userCreator = function (e: React.ChangeEvent<HTMLInputElement>): void {
    const newUser: any = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
  };
  // posting the user data to the server if only it is true and validated .
  const sendUserData = async function (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    isLoading(true);
    const nameValidationRes = nameValidation();
    const emailValidationRes = emailValidation();

    if (
      !nameValidationRes.error &&
      !emailValidationRes.error
    ) {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        user
      );

      if (data.message === "success") {
        // redirect to login page
        
        isLoading(false);
        navigate("/login");
      } else {
        isLoading(false);
        const { message } = data.errors.email;
        setEmailExistenceMsg(message);
      }
    } else {
      isLoading(false);
    }
  };

  // Validation functions .

  const nameValidation = function () {
    const schema = joi
      .object({
        name: joi.string().alphanum().min(3).max(10).required(),
      })
      .extract("name");

    const result = schema.validate(fNameInput.current?.value);

    if (result.error) {
      fNameInput.current?.classList.add("is-invalid");
      setFNameMsg("First name must be at least 3 chars and maximum 10 chars");

      return result;
    } else {
      fNameInput.current?.classList.replace("is-invalid", "is-valid");
      setFNameMsg("");

      return result;
    }
  };


  const emailValidation = function () {
    const schema = joi
      .object({
        email: joi
          .string()
          .email({ minDomainSegments: 2, tlds: false })
          .required(),
      })
      .extract("email");
    const result = schema.validate(emailInput.current?.value);

    if (result.error) {
      emailInput.current?.classList.add("is-invalid");
      setEmailMsg("Ex: johndoe@email.com");
      return result;
    } else {
      emailInput.current?.classList.replace("is-invalid", "is-valid");
      setEmailMsg("");
      return result;
    }
  };

  return (
    <section className="p-1">
      <h2 className="mt-5 mb-5 w-75 m-auto">Register Now!</h2>
      <form onSubmit={sendUserData} className=" form-box p-4 w-75 m-auto">
        <p className="text-center text-danger">{emailExistenceMsg}</p>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            onChange={userCreator}
            onInput={nameValidation}
            ref={fNameInput}
            type="text"
            className="form-control"
            id="name"
            name="name"
          />
          <p className="text-danger mt-2">{fNameMsg}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            onChange={userCreator}
            onInput={emailValidation}
            ref={emailInput}
            type="email"
            className="form-control"
            id="email"
            name="email"
          />
          <p className="text-danger mt-2">{emailMsg}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={userCreator}
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Form Accepts any password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rePassword" className="form-label">
            Confirm Password
          </label>
          <input
            onChange={userCreator}
            type="password"
            className="form-control"
            id="rePassword"
            name="rePassword"
            placeholder="Form Accepts any password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            onChange={userCreator}
            type="text"
            className="form-control"
            id="phone"
            name="phone"
          />
        </div>
        {loading ? (
          <div className="bg-dark w-100 text-center rounded-3 mt-4 py-2">
            <i className="fa-solid fa-spinner fa-spin-pulse "></i>
          </div>
        ) : (
          <button
            type="submit"
            className="btn btn-dark w-100 rounded-3 mt-3 py-2"
          >
            Register
          </button>
        )}
      </form>
    </section>
  );
};

export default Register;
