import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Tv_Sidebar from "./Sidebar/Tv_Sidebar";
import { NoxeContext } from "./Context/Store";

interface MovModel {
  id: string;
  name: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  original_language: string;
  overview: string;
  genres: string;
}

export default function Tv_series() {
  const context = useContext(NoxeContext);

  return (
    <>
      <Tv_Sidebar
        getTvGenres={context.getGenres}
        getTvCategories={context.getCategories}
      />
      <main>
        <div className="container-custom">
          <div className="mb-5 mt-5 w-50 m-auto search_input--container">
            <input
              type="search"
              ref={context.searchInput}
              onInput={() => {
                context.search(context.searchInput.current?.value, "tv");
              }}
              className="form-control test"
              id="exampleFormControlInput1"
              placeholder="Search tv name"
            />
          </div>

          {context.searchInput.current?.value ? (
            <div className="row justify-content-center justify-content-md-start gy-5">
              {context.searchResult.map((tv: MovModel, i: number) => (
                <div key={i} className="movie col-md-2">
                  <Link to={`/movie-details/${tv.id}`}>
                    <div className="position-relative">
                      {tv.vote_average < 6 ? (
                        <p className="position-absolute top-0 end-0 bg-danger p-2">
                          {tv.vote_average.toFixed(1)}
                        </p>
                      ) : tv.vote_average >= 6 && tv.vote_average < 7 ? (
                        <p className="position-absolute top-0 end-0 bg-warning p-2">
                          {tv.vote_average.toFixed(1)}
                        </p>
                      ) : tv.vote_average >= 7 ? (
                        <p className="position-absolute top-0 end-0 bg-success p-2">
                          {tv.vote_average.toFixed(1)}
                        </p>
                      ) : (
                        ""
                      )}
                      <img
                        src={"https://image.tmdb.org/t/p/w500" + tv.poster_path}
                        alt=""
                        className="w-100 rounded-2"
                      />
                    </div>
                  </Link>
                  <p className="mt-3">{tv.name}</p>
                </div>
              ))}
            </div>
          ) : !context.searchInput.current?.value ? (
            <>
              <div className="row justify-content-center justify-content-md-start gy-5">
                {context.allTv.map((tv: MovModel, i: number) => (
                  <div key={i} className="movie col-md-2">
                    <Link to={`/tv-details/${tv.id}`}>
                      <div className="position-relative">
                        {tv.vote_average < 6 ? (
                          <p className="position-absolute top-0 end-0 bg-danger p-2">
                            {tv.vote_average.toFixed(1)}
                          </p>
                        ) : tv.vote_average >= 6 && tv.vote_average < 7 ? (
                          <p className="position-absolute top-0 end-0 bg-warning p-2">
                            {tv.vote_average.toFixed(1)}
                          </p>
                        ) : tv.vote_average >= 7 ? (
                          <p className="position-absolute top-0 end-0 bg-success p-2">
                            {tv.vote_average.toFixed(1)}
                          </p>
                        ) : (
                          ""
                        )}
                        <img
                          src={
                            "https://image.tmdb.org/t/p/w500" + tv.poster_path
                          }
                          alt=""
                          className="w-100 rounded-2"
                        />
                      </div>
                    </Link>
                    <p className="mt-3">{tv.name}</p>
                  </div>
                ))}
              </div>
              <nav aria-label="Page  navigation example">
                <ul className="pagination justify-content-center">
                  <li
                    className="page-item disabled prevBtn"
                    ref={context.btnPrev}
                  >
                    <span
                      className="page-link cursor"
                      onClick={() => {
                        context.getData(
                          context.currPage - 1,
                          context.setAllTv,
                          "tv"
                        );
                      }}
                    >
                      Previous
                    </span>
                  </li>
                  <li className="page-item">
                    <p className="page-link text-black">{context.currPage}</p>
                  </li>
                  <li className="page-item" ref={context.btnNext}>
                    <span
                      className="page-link cursor"
                      onClick={() => {
                        context.getData(
                          context.currPage + 1,
                          context.setAllTv,
                          "tv"
                        );
                      }}
                    >
                      Next
                    </span>
                  </li>
                </ul>
              </nav>
            </>
          ) : (
            <div className="vh-100 d-flex align-items-center justify-content-center">
              <i className="fas fa-spinner fa-spin fa-3x"></i>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
