import React, { useContext, useEffect, useRef } from "react";
import style from "../Sidebar/sidebar.module.css";
import { NoxeContext } from "../Context/Store";

interface props {
  getMovieGenres: (
    e: React.ChangeEvent<HTMLSelectElement>,
    callback: Function,
    type: string
  ) => void;
  getMovieCategories: (category: any, callback: Function, type: string) => void;
}

const MoviesSidebar: React.FC<props> = ({
  getMovieGenres,
  getMovieCategories,
}) => {
  const context = useContext(NoxeContext);
  const btnToggle = useRef<HTMLButtonElement>(null);

  // this function happens whenever the user clicks on the burger icon .
  const toggleSidebar = function () {
    if (!btnToggle.current?.classList[1]) {
      btnToggle.current?.children[0].classList.replace("fa-close", "fa-bars");
      btnToggle.current?.classList.add("play");
      context.toggler.current.style.left = "-250px";
    } else {
      btnToggle.current.children[0].classList.replace("fa-bars", "fa-close");
      btnToggle.current.classList.remove("play");
      context.toggler.current.style.left = "0";
    }
  };

  useEffect(() => {
    const navObserver = new IntersectionObserver(context.navIntersector, {
      root: null,
      threshold: 0.1,
    });
    navObserver.observe(context.navbarRef.current);
  }, []);

  return (
    <nav
      className={`${style["side-nav"]} bg-dark d-flex justify-content-center `}
      ref={context.toggler}
    >
      <div className="nav-content text-center">
        <div className={`${style["movies-categories"]}`}>
          <p
            onClick={() => {
              getMovieCategories("now_playing", context.setAllMovies, "movie");
            }}
          >
            Now Playing
          </p>
          <p
            onClick={() => {
              getMovieCategories("top_rated", context.setAllMovies, "movie");
            }}
          >
            Top rated
          </p>
          <p
            onClick={() => {
              getMovieCategories("popular", context.setAllMovies, "movie");
            }}
          >
            Popular
          </p>
          <p
            onClick={() => {
              getMovieCategories("upcoming", context.setAllMovies, "movie");
            }}
          >
            Up coming
          </p>
        </div>

        <div className="inner-content mt-5">
          <select
            className="form-select w-100"
            aria-label="Default select example"
            onChange={(e: any) => {
              getMovieGenres(e, context.setAllMovies, "movie");
            }}
          >
            <option defaultValue={"all"}>All Genres</option>
            <option value="28">Action</option>
            <option value="35">Comedy</option>
            <option value="53">Thriller</option>
            <option value="27">Horror</option>
            <option value="12">Adventure</option>
          </select>
        </div>
      </div>
      <div className={`${style.collapse} d-flex`}>
        <button
          className={`${style.btn} play`}
          onClick={toggleSidebar}
          ref={btnToggle}
        >
          <i className="fa-solid fa-bars fa-2x"></i>
        </button>
      </div>
    </nav>
  );
};
export default MoviesSidebar;
