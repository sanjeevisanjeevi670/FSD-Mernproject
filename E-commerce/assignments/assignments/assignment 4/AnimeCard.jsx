const AnimeCard = ({ anime }) => {
  return (
    <div className="anime-card">
      <img src={anime.images.jpg.large_image_url} alt={anime.title} />

      <h3>{anime.title}</h3>

      <p><strong>Rating:</strong> ⭐ {anime.score || "N/A"}</p>
      <p className="synopsis">
        {anime.synopsis ? anime.synopsis.slice(0, 100) + "..." : "No Description"}
      </p>
    </div>
  );
};

export default AnimeCard;
