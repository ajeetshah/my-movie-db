import { useEffect, useState } from "react";

const key = "PUT_YOUR_KEY_HERE_DONT_SHOW_IT_TO_OTHERS";

const TrendingMovies = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const trendUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${key}`;
    fetch(trendUrl)
      .then((response) => response.json())
      .then((data) => {
        setTrending(data.results);
      })
      .catch((error) => {
        console.log("Error!! Data interupted!:", error);
      });
  }, []);

  const moviesIdCollections = trending.map((item) => item.id);

  return (
    <div className="trending-container">
      <h1 className="row-label" tabIndex={0}>
        This Weeks Trending Tittles
      </h1>
      {moviesIdCollections.map((elm) => (
        <MovieDetail key={elm} id={elm} trending={trending} />
      ))}
    </div>
  );
};

const getMovieDetail = (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${key}`;
  return fetch(url);
};

function MovieDetail({ id, trending }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetail(id)
      .then((res) => res.json())
      .then((res) => setMovie(res?.results?.US?.link));
  }, [id]);

  return (
    <ul className="flexed-trending">
      {trending.map((it) => (
        <div className="poster-container" key={it.id}>
          <a target="_blank" rel="noopener noreferrer" href={movie}>
            <li className="list-item">
              <img
                className="image-element"
                tabIndex={0}
                aria-label={it.title}
                title={`--Title: ${it.title}--  --Description:    ${it.overview}--  --Vote Average: ${it.vote_average}`}
                alt="movie poster"
                src={`https://image.tmdb.org/t/p/w500${it.poster_path}`}
              />
              <h3 className="posterTitle">{it.title}</h3>
            </li>
          </a>
        </div>
      ))}
    </ul>
  );
}

export default TrendingMovies;
