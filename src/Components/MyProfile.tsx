import React, { useContext, useEffect } from "react";
import { NoxeContext } from "./Context/Store";
import { Link } from "react-router-dom";

interface Props {
  userData: any;
}

const MyProfile: React.FC<Props> = ({ userData }) => {
  const context = useContext(NoxeContext);

  const bookmarkList = localStorage.getItem("bookmarkList");

  useEffect(() => {
    bookmarkList
      ? context.setFavoriteList(JSON.parse(bookmarkList))
      : context.setFavoriteList([]);
  }, []);

  return (
    <main>
      <div className="container-custom">
        {userData ? (
          <div>
            <p>ID: {userData._id}</p>
            <p>First name: {userData.first_name}</p>
            <p>Last name: {userData.last_name}</p>
            <p>email: {userData.email}</p>
          </div>
        ) : (
          ""
        )}
        <h2 className="mb-4 mt-5">Bookmark</h2>
        <div className="row gy-5">
          {context.favoriteList?.map((movie: any, i: number) => (
            <div key={i} className="movie col-md-2">
              <Link
                to={`${movie.name ? "/tv-details/" : "/movie-details/"}${
                  movie.id
                }`}
              >
                <img
                  src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                  alt=""
                  className="w-100"
                />
              </Link>
              <p>{movie.title || movie.name}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
export default MyProfile;
