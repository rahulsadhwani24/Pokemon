import { useState, useEffect } from "react"
import Logo from "/Logo.webp";
import Pokemon from "./Pokemon";
import PokemonLoading from "./PokemonLoading";
import { Link } from "react-router-dom";


const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const PAGE_SIZE = 20;

  useEffect(() => {
    try {
      const fetchPokemon = async () => {
        const API = "https://pokeapi.co/api/v2/pokemon?limit=1025";
        const response = await fetch(API);
        const data = await response.json();
        const pokemons = data.results.map(async (currPokemon) => {
          const pokemonResponse = await fetch(currPokemon.url);
          const pokemonData = await pokemonResponse.json();
          return pokemonData;
        });
        const pokemonData = await Promise.all(pokemons);
        setAllPokemons(pokemonData);
      };
      fetchPokemon();
    } catch (error) { }
  }, [])

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const API = `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`;
      const response = await fetch(API);
      const data = await response.json();

      const pokemons = await Promise.all(
        data.results.map(async (currPokemon) => {
          const res = await fetch(currPokemon.url);
          return await res.json();
        })
      );

      setPokemon((prev) => [...prev, ...pokemons]);
      setOffset((prev) => prev + PAGE_SIZE);
      if (!data.next) setHasMore(false);

    }
    catch (error) { }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const filteredPokemon = allPokemons.filter((currPokemon) =>
    currPokemon.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <header className="header">
        <img src={Logo} alt="Pokemon" />
        <div>
          <input
            type="text"
            placeholder="Search Pokemon"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </header>

      <div className="appContainer">
        {(searchInput.length > 0) ?
          filteredPokemon.slice(0, 20).map((currPokemon, index) => (
            <Link key={index} to={`/Pokemon/${encodeURIComponent(currPokemon.name)}`}>
              <Pokemon
                pokemonImage={
                  currPokemon.sprites.other.home.front_default ||
                  currPokemon.sprites.other["official-artwork"].front_default
                }
                pokemonName={currPokemon.name}
                pokemonId={currPokemon.id}
                pokemonType={currPokemon.types}
              />
            </Link>
          ))
          :
          <>
            {
              pokemon.length > 0 ? (
                pokemon.map((currPokemon, index) => (
                  <Link key={index} to={`/Pokemon/${encodeURIComponent(currPokemon.name)}`}>
                    <Pokemon
                      pokemonImage={
                        currPokemon.sprites.other.home.front_default ||
                        currPokemon.sprites.other["official-artwork"].front_default
                      }
                      pokemonName={currPokemon.name}
                      pokemonId={currPokemon.id}
                      pokemonType={currPokemon.types}
                    />
                  </Link>
                ))
              ) : (
                <>
                  <h1 style={{ width: "100%", textAlign: "center" }}>Loading...</h1>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="loadingCard">
                      <PokemonLoading />
                    </div>
                  ))}
                </>
              )
            }

            {
              hasMore && (
                <div className="loadMoreContainer">
                  <button onClick={fetchPokemon} disabled={loading}>
                    {loading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )
            }
          </>
        }
      </div>
    </>
  )
}

export default Home