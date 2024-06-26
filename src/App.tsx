import React, { useEffect, useState } from "react";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Movies from "./Components/Movies";
import Motd from "./Components/Motd";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { useNavigate, Navigate, Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import TvDetails from "./Components/TvDetails";
import { NoxeContextProvider } from "./Components/Context/Store";
import MovieDetails from "./Components/MovieDetails";
import MyProfile from "./Components/MyProfile";
import TvSeries from "./Components/Tvseries";

interface Props {
  children: JSX.Element;
}

interface decodedTokenInterface {
  exp: number;
  iat: number;
  id: string;
  name: string;
  role: string;
};

export default function App() {
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  // Transforming the encoded token to decoded token
  const getUserData = (): void => {
    const encodedToken: string | null = localStorage.getItem("token");
    const decodedToken: decodedTokenInterface = jwt_decode(encodedToken || "");
    setUserData(decodedToken);
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
                <MovieDetails />
              </RouterGuard>
            }
          >
            <Route
              path=":id"
              element={
                <RouterGuard>
                  <MovieDetails />
                </RouterGuard>
              }
            />
          </Route>

          <Route
            path="tv-details"
            element={
              <RouterGuard>
                <TvDetails />
              </RouterGuard>
            }
          >
            <Route
              path=":id"
              element={
                <RouterGuard>
                  <TvDetails />
                </RouterGuard>
              }
            />
          </Route>

          <Route
            path="/tvseries"
            element={
              <RouterGuard>
                <TvSeries />
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
            path="/profile"
            element={
              <RouterGuard>
                <MyProfile userData={userData} />
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
