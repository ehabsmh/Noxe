import React, { useContext, useEffect, useRef } from "react";
import { NoxeContext } from "../Context/Store";
import style from "../Sidebar/sidebar.module.css";

interface props {
  getTvGenres: (
    e: React.ChangeEvent<HTMLSelectElement>,
    callback: Function,
    type: string
  ) => void;
  getTvCategories: (category: string, callback: Function, type: string) => void;
}

const Tv_Sidebar: React.FC<props> = ({ getTvGenres, getTvCategories }) => {
  const context = useContext(NoxeContext);
  // const toggler = useRef<HTMLElement | any>(null);
  const btnToggle = useRef<HTMLButtonElement>(null);

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
              getTvCategories("on_the_air", context.setAllTv, "tv");
            }}
          >
            Tv on the air
          </p>
          <p
            onClick={() => {
              getTvCategories("airing_today", context.setAllTv, "tv");
            }}
          >
            Airing Today
          </p>
          <p
            onClick={() => {
              getTvCategories("popular", context.setAllTv, "tv");
            }}
          >
            Popular
          </p>
          <p
            onClick={() => {
              getTvCategories("top_rated", context.setAllTv, "tv");
            }}
          >
            Top Rated
          </p>
        </div>

        <div className="inner-content   mt-5">
          <select
            className="form-select w-100"
            aria-label="Default select example"
            onChange={(e: any) => {
              getTvGenres(e, context.setAllTv, "tv");
            }}
          >
            <option defaultValue={"all"}>All Genres</option>
            <option value="10759">Action & Adventure</option>
            <option value="35">Comedy</option>
            <option value="80">Crime</option>
            <option value="18">Drama</option>
            <option value="10765">Sci-Fi & Fantasy</option>
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
export default Tv_Sidebar;
