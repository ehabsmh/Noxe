import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface loginType {
  email: string;
  password: string;
}

interface Props {
  saveUserData: () => void;
}

const Login: React.FC<Props> = ({ saveUserData }) => {
  // User Object to collect user data inside to Login .
  const [user, setUser] = useState<loginType>({
    email: "",
    password: "",
  });

  // email address is not exist msg .
  const [emailExistenceMsg, setEmailExistenceMsg] = useState<string>("");

  // loading icon .
  const [loading, isLoading] = useState<boolean>(false);

  // To navigate the user to homepage after checking user is exist .
  const navigate = useNavigate();

  // This function to collect the object from the input value .
  const userCreator = function (e: React.ChangeEvent<HTMLInputElement>): void {
    const newUser: any = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
  };

  // Posting the user data to the server to check if this user exist or not .
  const sendUserData = async function (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    isLoading(true);

    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      user
    );

    if (data.message === "success") {
      isLoading(false);

      // getting the user token if data is success
      localStorage.setItem("token", data.token);

      // This function inside the App Component to save the user data and calling it when the user has logged in successfully .
      saveUserData();

      navigate("/home");
    } else {
      isLoading(false);
      const { message } = data;
      setEmailExistenceMsg(message);
    }
  };

  // Component did mount here to prevent the user from accessing the login page while he's already logged in .
  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/home");
  }, []);

  return (
    <section className="p-1">
      <h2 className="mt-5 mb-5 w-75 m-auto">Login Now!</h2>
      <form onSubmit={sendUserData} className=" form-box p-4 w-75 m-auto">
        <p className="text-center text-danger">{emailExistenceMsg}</p>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            onChange={userCreator}
            type="email"
            className="form-control"
            id="email"
            name="email"
          />
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
            placeholder="Form is Accepts any password 😊"
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
            Login
          </button>
        )}
      </form>
    </section>
  );
};

export default Login;
