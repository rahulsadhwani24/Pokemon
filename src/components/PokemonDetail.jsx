import React from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "/Logo.webp";

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [nextPokemon, setNextPokemon] = useState(null);
  const [previousPokemon, setPreviousPokemon] = useState(null);
  const navigateToHome = useNavigate();

  // Redirect to Home
  useEffect(() => {
    const handlePopState = () => {
      // window.location.href = "/";
      navigateToHome("/Pokemon/");
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const data = await response.json();
        setPokemon(data);
      } catch (error) { }
    };
    fetchPokemon();
  }, [name]);

  useEffect(() => {
    const fetchPreviousPokemon = async () => {
      if (pokemon && pokemon.id > 1) {
        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.id - 1}`
          );
          const data = await response.json();
          setPreviousPokemon(data);
        } catch (error) { }
      }
    };
    fetchPreviousPokemon();

    const fetchNextPokemon = async () => {
      if (pokemon && pokemon.id < 1025) {
        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.id + 1}`
          );
          const data = await response.json();
          setNextPokemon(data);
        } catch (error) { }
      }
    }
    fetchNextPokemon();
  }, [pokemon]);

  return (
    <div className="pokemon-detail-page">
      <header className="header" style={{ paddingBlock: "20px" }}>
        <img src={Logo} alt="Pokemon" style={{ cursor: "pointer" }} onClick={() => { navigateToHome("/Pokemon/") }} />
      </header>
      {pokemon ? (
        <div className="pokemon-detail">
          <div className="pokemon-header">
            {/* Previous Pokemon Link */}
            <div className="previous-pokemon-container">
              {pokemon.id > 1 ? (
                <Link to={`/Pokemon/${(previousPokemon) && previousPokemon.name}`} className="previous-pokemon">
                  <span className="previous-pokemon-id">{(previousPokemon) && previousPokemon.id.toString().padStart(4, "0")}</span>
                  <span className="previous-pokemon-name">{(previousPokemon) && previousPokemon.name}</span>
                </Link>
              ) : (<span className="no-previous-pokemon">No Previous Pokemon</span>)}
            </div>

            <div className="pokemon-detail-name-container">
              <span className="id">
                {pokemon.id.toString().padStart(4, "0")}
              </span>
              <h2 className="name">{pokemon.name}</h2>
            </div>

            {/* Next Pokemon Link */}
            <div className="next-pokemon-container">
              {pokemon.id < 1025 ? (
                <Link to={`/Pokemon/${(nextPokemon) && nextPokemon.name}`} className="next-pokemon">
                  <span className="next-pokemon-id">{(nextPokemon) && nextPokemon.id.toString().padStart(4, "0")}</span>
                  <span className="next-pokemon-name">{(nextPokemon) && nextPokemon.name}</span>
                </Link>
              ) : (<span className="no-next-pokemon">No Next Pokemon</span>)}
            </div>
          </div>

          <div className="pokemon-details-container">

            <div className="container-left">
              <div className="pokemon-type-container">
                <h3 className="pokemon-type-title">Type</h3>
                <div className="pokemon-types">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className={`pokemon-each-type ${type.type.name}`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="abilities">
                <h3 className="abilities-type-title">Abilities</h3>
                <ul>
                  {pokemon.abilities.map((ability) => (
                    <li key={ability.ability.name}>{ability.ability.name}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pokemon-image">
              <img
                src={pokemon.sprites.other.home.front_default}
                alt={pokemon.name}
              />
            </div>

            <div className="container-right">
              <div className="height">
                Height <span>{(pokemon.height / 10)} m</span>
              </div>
              <div className="weight">
                Weight <span>{(pokemon.weight / 10)} kg</span>
              </div>
              <div className="base-experience">
                Base Experience <span>{pokemon.base_experience}</span>
              </div>
            </div>
          </div>

          <div className="pokemon-stats-moves">

            <div className="stats-container">
              <h3>Stats:</h3>
              <ul>
                {pokemon.stats.map((stat) => (
                  <li key={stat.stat.name} className="stat">
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="moves-container">
              <h3>Moves:</h3>
              <ul>
                {pokemon.moves.slice(0, 10).map((move) => (
                  <li key={move.move.name}>{move.move.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonDetail;
