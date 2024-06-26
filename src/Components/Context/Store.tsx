import axios, { AxiosResponse } from "axios";
import { createContext, useEffect, useRef, useState } from "react";

interface NoxeContextProviderProps {
  children: React.ReactNode;
}
// interface MovModel {
//   id: string;
//   title: string;
//   backdrop_path: string;
//   poster_path: string;
//   release_date: string;
//   vote_average: number;
//   original_language: string;
//   overview: string;
//   name: string;
//   profile_path: string;
// }

interface MovModel {
  id: string;
  title: string;
  name: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  original_language: string;
  overview: string;
  bookmarked?: boolean;
  genres?: string | any;
  profile_path?: string;
}

export const NoxeContext = createContext<any>(null);

export const NoxeContextProvider = ({ children }: NoxeContextProviderProps) => {
  // For Home Component
  const [trendingMovies, setTrendingMovies] = useState<MovModel[]>([]);
  const [trendingSeries, setTrendingSeries] = useState<MovModel[]>([]);
  const [trendingPeople, setTrendingPeople] = useState<MovModel[]>([]);

  const getTrending = async function (movieType: string, callback: Function) {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${movieType}/week?api_key=f1aca93e54807386df3f6972a5c33b50`
    );
    callback(data.results.slice(0, 10));
  };
  useEffect(() => {
    getTrending("movie", setTrendingMovies);
    getTrending("tv", setTrendingSeries);
    getTrending("person", setTrendingPeople);
  }, []);

  // For Movies and Tv_series Component
  const [allMovies, setAllMovies] = useState<MovModel[]>([]);
  const [allTv, setAllTv] = useState<MovModel[]>([]);

  let [matchUser, setMatchUser] = useState<MovModel[]>([]);

  // the final result when the user searches
  let [searchResult, setSearchResult] = useState<MovModel[]>([]);

  // a state of the current page
  let [currPage, setCurrPage] = useState(1);

  // Buttons
  const btnPrev = useRef<HTMLLIElement>(null);
  const btnNext = useRef<HTMLLIElement>(null);

  const getData = async function (
    currPage: number,
    callback: Function,
    type: string
  ) {
    let { data } = await axios.get<
      any,
      AxiosResponse<{ results: MovModel[] }, any>,
      any
    >(
      `https://api.themoviedb.org/3/discover/${type}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currPage}`
    );

    const parsedFavList: MovModel[] = JSON.parse(
      localStorage.getItem("bookmarkList") || "[]"
    );

    const mappedMovies = data.results.map((movie) => {
      const isMovieBookmarked: boolean = Boolean(
        parsedFavList.find((favMovie) => favMovie.id === movie.id)
      );

      movie.bookmarked = isMovieBookmarked;
      return movie;
    });

    callback(mappedMovies);
    setCurrPage(currPage);
  };

  const checkPagination = function () {
    if (currPage > 1) btnPrev.current?.classList.remove("disabled");
    else btnPrev.current?.classList.add("disabled");

    if (currPage === 500) btnNext.current?.classList.add("disabled");
    else btnNext.current?.classList.remove("disabled");
  };

  useEffect(() => {
    checkPagination();
  }, [currPage]);

  const searchInput = useRef<HTMLInputElement>(null);

  const userSearch = async function (
    userEntry: string | undefined,
    type: string
  ) {
    if (userEntry) {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type}?api_key=f1aca93e54807386df3f6972a5c33b50&query=${userEntry}`
      );
      setMatchUser(data.results);

      const showType = type === "movie" ? "title" : "name";

      const userSearchResult = matchUser.filter(
        (mov) =>
          mov[showType]?.toLowerCase().includes(userEntry.toLowerCase()) &&
          mov.poster_path
      );

      setSearchResult(userSearchResult);
    } else {
      if (allTv) getData(currPage, setAllTv, "tv");
      else if (allMovies) getData(currPage, setAllMovies, "movie");
    }
  };

  const getGenres = async function (
    e: React.ChangeEvent<HTMLSelectElement>,
    callback: Function,
    type: string
  ) {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/${type}?api_key=f1aca93e54807386df3f6972a5c33b50&with_genres=${e.target.value}&page=${currPage}`
    );
    callback(data.results);
    setCurrPage(1);
  };

  const getCategories = async function (
    category: any,
    callback: Function,
    type: string
  ) {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${category}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&page=${currPage}`
    );
    callback(data.results);
    setCurrPage(1);
  };

  // FavoriteList

  const [favoriteList, setFavoriteList] = useState<MovModel[] | any>(null);

  const addToFavorite = (movie: MovModel) => {
    const favList: string | null = localStorage.getItem("bookmarkList");

    let parsedFavList: MovModel[] = favList ? JSON.parse(favList) : [];

    const isMovieAlreadyAdded: boolean = Boolean(
      parsedFavList.find((mov) => mov.id === movie.id)
    );

    parsedFavList = isMovieAlreadyAdded
      ? parsedFavList
      : [...parsedFavList, movie];
    localStorage.setItem("bookmarkList", JSON.stringify(parsedFavList));
    setFavoriteList(parsedFavList);

    // Update the current movies array with the new bookmarked movies => bookmarked

    const mappedMovies = allMovies.map((_) => {
      const isMovieBookmarked: boolean = Boolean(
        parsedFavList.find((favMovie) => favMovie.id === movie.id)
      );

      movie.bookmarked = isMovieBookmarked;

      return movie;
    });
    const mappedTv = allTv.map((_) => {
      const isTvBookmarked: boolean = Boolean(
        parsedFavList.find((favTv) => favTv.id === movie.id)
      );

      movie.bookmarked = isTvBookmarked;

      return movie;
    });
    setFavoriteList([...mappedMovies, ...mappedTv]);
  };

  // navbar ref for observing
  const navbarRef = useRef(null);

  // sidebarRef
  const toggler = useRef<HTMLElement | any>(null);

  const navIntersector = (entries: any) => {
    const [entry] = entries;
    if (toggler.current) {
      if (!entry.isIntersecting) {
        toggler.current.style.top = "0";
      } else {
        toggler.current.style.top = "64px";
      }
    }
  };

  return (
    <NoxeContext.Provider
      value={{
        trendingMovies,
        trendingSeries,
        trendingPeople,
        btnPrev,
        btnNext,
        allMovies,
        allTv,
        setAllTv,
        setAllMovies,
        matchUser,
        searchResult,
        currPage,
        searchInput,
        userSearch,
        getGenres,
        getCategories,
        getData,
        favoriteList,
        setFavoriteList,
        addToFavorite,
        navbarRef,
        toggler,
        navIntersector,
      }}
    >
      {children}
    </NoxeContext.Provider>
  );
};
