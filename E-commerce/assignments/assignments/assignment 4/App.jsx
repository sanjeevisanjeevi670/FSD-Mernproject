// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "./components/Navbar";
// import CountryList from "./components/CountryList";
// import "./App.css";

// function App() {
//   const [countries, setCountries] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         // ✅ Correct API URL with https
//         const response = await axios.get("https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population");

//         if (!Array.isArray(response.data)) {
//           throw new Error("API returned unexpected data format");
//         }

//         setCountries(response.data);
//       } catch (err) {
//         console.error("API Error:", err);
//         setError(err.message);
//         setCountries([]); // prevent filter() crash
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCountries();
//   }, []);

//   // Safe array before filtering
//   const safeCountries = Array.isArray(countries) ? countries : [];

//   const filteredCountries = safeCountries.filter((country) => {
//     const matchesSearch = country.name.common
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     const matchesFilter =
//       filter === "All" ? true : country.region === filter;

//     return matchesSearch && matchesFilter;
//   });

//   return (
//     <div className="app">
//       <Navbar
//         search={search}
//         setSearch={setSearch}
//         filter={filter}
//         setFilter={setFilter}
//       />

//       {error && (
//         <h2 style={{ textAlign: "center", color: "red" }}>❌ {error}</h2>
//       )}

//       {loading ? (
//         <h2 className="loading">Loading...</h2>
//       ) : (
//         <CountryList countries={filteredCountries} />
//       )}
//     </div>
//   );
// }

// export default App;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "./components/Navbar";
// import FlightList from "./components/FlightList";
// import "./App.css";

// function App() {
//   const [flights, setFlights] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchFlights = async () => {
//       try {
//         const response = await axios.get("/flights.json");

//         if (!Array.isArray(response.data)) {
//           throw new Error("Invalid flight data format");
//         }

//         setFlights(response.data);
//       } catch (err) {
//         console.error("API Error:", err);
//         setError(err.message);
//         setFlights([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFlights();
//   }, []);

//   const safeFlights = Array.isArray(flights) ? flights : [];

//   const filteredFlights = safeFlights.filter((flight) => {
//     const matchesSearch = flight.airline
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     const matchesFilter =
//       filter === "All" ? true : flight.departure === filter;

//     return matchesSearch && matchesFilter;
//   });

//   return (
//     <div className="app">
//       <Navbar
//         search={search}
//         setSearch={setSearch}
//         filter={filter}
//         setFilter={setFilter}
//       />

//       {error && (
//         <h2 style={{ textAlign: "center", color: "red" }}>❌ {error}</h2>
//       )}

//       {loading ? (
//         <h2 className="loading">Loading flights...</h2>
//       ) : (
//         <FlightList flights={filteredFlights} />
//       )}
//     </div>
//   );
// }

// export default App;

import AnimeList from "./AnimeList";

function App() {
  return <AnimeList />;
}

export default App;
