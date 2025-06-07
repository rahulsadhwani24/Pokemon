import React from "react";

const PokemonLoading = () => {
  return (
    <div className="pokemonContainer">
      <div className="imageContainer">
        <div className="pokeball"></div>
      </div>
      <div className="pokemonDetails">
        <h4 className="loadingpokemonId"></h4>
        <h2 className="loadingpokemonName"></h2>
        <div className="loadingpokemonType">
          <span className="loadingtype" style={{ backgroundColor: "#0000ff" }}></span>
          <span className="loadingtype" style={{ backgroundColor: "#0000ff" }}></span>
        </div>
      </div>
    </div>
  );
};

export default PokemonLoading;
