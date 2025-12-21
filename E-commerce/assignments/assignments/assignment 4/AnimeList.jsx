import { useEffect, useState } from "react";
import axios from "axios";
import AnimeCard from "./AnimeCard";

const AnimeList = () => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.jikan.moe/v4/anime")
      .then((res) => {
        setAnimes(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }, []); // runs once on mount

  if (loading) return <h2 className="loading">Loading anime...</h2>;

  return (
    <div className="anime-list">
      {animes.map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </div>
  );
};

export default AnimeList;
