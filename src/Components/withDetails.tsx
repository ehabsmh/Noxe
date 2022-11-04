import { match } from "assert";
import axios from "axios";
import React, { Component } from "react";
import { useParams } from "react-router-dom";

interface TvDetail {
  backdrop_path: string;
  poster_path: string;
  name: string;
  last_air_date: string;
  vote_average: number;
  original_language: string;
  overview: string;
  genres: string | any;
}

const withDetails = (OriginalComponent: any) => {
  return class withDetails extends React.Component<
    {},
    { tvDetails: TvDetail | null }
  > {
    constructor(props: any) {
      super(props);

      this.state = {
        tvDetails: null,
      };
    }
    getMovieDetails = async (): Promise<void> => {
      const params = useParams();
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/${params.id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`
      );
      this.setState({ tvDetails: data });
    };

    componentDidMount() {
      this.getMovieDetails();
    }

    render(): any {
      return (
        <OriginalComponent
          tvDetails={this.state.tvDetails}
          getMovieDetails={this.getMovieDetails}
        />
      );
    }
  };
};

export default withDetails;
