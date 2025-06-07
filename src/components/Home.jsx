import { useEffect, useState } from "react";
import Logo from "/Logo.webp";
import Pokemon from "./Pokemon";
import PokemonLoading from "./PokemonLoading";
import PokemonDetail from "./PokemonDetail";
import { Link, Navigate } from "react-router-dom";

function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    try {
      const fetchPokemon = async () => {
        const API = "https://pokeapi.co/api/v2/pokemon?limit=1302";
        const response = await fetch(API);
        const data = await response.json();
        const pokemons = data.results.map(async (currPokemon) => {
          const pokemonResponse = await fetch(currPokemon.url);
          const pokemonData = await pokemonResponse.json();
          return pokemonData;
        });
        const pokemonData = await Promise.all(pokemons);
        setPokemon(pokemonData);
      };

      fetchPokemon();
    } catch (error) {}
  }, []);


  const LoadingCards = [
    <PokemonLoading />,
    <PokemonLoading />,
    <PokemonLoading />,
    <PokemonLoading />,
    <PokemonLoading />,
    <PokemonLoading />,
    <PokemonLoading />,
    <PokemonLoading />,
    <PokemonLoading />,
    <PokemonLoading />,
    <PokemonLoading />,
    <PokemonLoading />,
  ];

  const filteredPokemon = pokemon.filter((currPokemon) =>
    currPokemon.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  
  const PAGE_SIZE = 20;
  const totalPages = Math.ceil(filteredPokemon.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;


  return (
    <>
      <header className="header">
        <img src={Logo} alt="Pokemon" />
        <div>
          <input
            type="text"
            name="searchPokemon"
            id="searchPokemon"
            placeholder="Search Pokemon"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
        </div>
      </header>

      <div className="appContainer">
        {pokemon.length > 0 ? (
          filteredPokemon.slice(startIndex, endIndex).map((currPokemon) => {
            return (
              <Link
              key={currPokemon.id}
              to={`/pokemon/${encodeURIComponent(currPokemon.name)}`}
              >
              <Pokemon
                pokemonImage={
                currPokemon.sprites.other.home.front_default
                  ? currPokemon.sprites.other.home.front_default
                  : currPokemon.sprites.other["official-artwork"].front_default
                }
                pokemonName={currPokemon.name}
                pokemonId={currPokemon.id}
                pokemonType={currPokemon.types}
              />
              </Link>
            );
          })
        ) : (
          <>
            <h1
              style={{ width: "100%", marginLeft: "2vw", textAlign: "center" }}
            >Loading...</h1>
            {LoadingCards.map((card, index) => (
              <div key={index} className="loadingCard">
                {card}
              </div>
            ))}
          </>
        )}
        {pokemon.length > 0 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >{"<<"} First</button>

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >Previous</button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >Next</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
