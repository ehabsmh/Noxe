import React, { useEffect, useState } from "react";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Movies from "./Components/Movies";
import Tv_series from "./Components/Tv_series";
import Motd from "./Components/Motd";
import About from "./Components/About";
import Networks from "./Components/Networks";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { useNavigate, Navigate, Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Movie_details from "./Components/Movie_details";
import Tv_details from "./Components/Tv_details";
import { NoxeContextProvider } from "./Components/Context/Store";
import My_Profile from "./Components/My_Profile";

interface Props {
  children: JSX.Element;
}

export default function App() {
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  // Transforming the encoded token to decoded token
  const getUserData = (): void => {
    const encodedToken = localStorage.getItem("token");
    const decodedToken: any = jwt_decode(encodedToken || "");
    setUserData(decodedToken);
    console.log(userData);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("login");
    setUserData(null);
  };

  const RouterGuard = (props: Props): JSX.Element => {
    if (!localStorage.getItem("token")) return <Navigate to={"/login"} />;
    else return props.children;
  };

  return (
    <>
      <NoxeContextProvider>
        <Navbar userData={userData} logout={logout} />
        <Routes>
          <Route
            path=""
            element={
              <RouterGuard>
                <Home />
              </RouterGuard>
            }
          />
          <Route
            path="/home"
            element={
              <RouterGuard>
                <Home />
              </RouterGuard>
            }
          />
          <Route
            path="/movies"
            element={
              <RouterGuard>
                <Movies />
              </RouterGuard>
            }
          />
          <Route
            path="movie-details"
            element={
              <RouterGuard>
                <Movie_details />
              </RouterGuard>
            }
          >
            <Route
              path=":id"
              element={
                <RouterGuard>
                  <Movie_details />
                </RouterGuard>
              }
            />
          </Route>

          <Route
            path="tv-details"
            element={
              <RouterGuard>
                <Tv_details />
              </RouterGuard>
            }
          >
            <Route
              path=":id"
              element={
                <RouterGuard>
                  <Tv_details />
                </RouterGuard>
              }
            />
          </Route>

          <Route
            path="/tvseries"
            element={
              <RouterGuard>
                <Tv_series />
              </RouterGuard>
            }
          />
          <Route
            path="/motd"
            element={
              <RouterGuard>
                <Motd />
              </RouterGuard>
            }
          />
          <Route
            path="/about"
            element={
              <RouterGuard>
                <About />
              </RouterGuard>
            }
          />
          <Route
            path="/networks"
            element={
              <RouterGuard>
                <Networks />
              </RouterGuard>
            }
          />

          <Route
            path="/profile"
            element={
              <RouterGuard>
                <My_Profile userData={userData} />
              </RouterGuard>
            }
          />

          <Route path="/login" element={<Login saveUserData={getUserData} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </NoxeContextProvider>
    </>
  );
}
