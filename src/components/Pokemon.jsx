import { useState } from "react";

const Pokemon = ({pokemonImage, pokemonName, pokemonId, pokemonType}) => {
    return(
        <div className="pokemonContainer">
            <div className="imageContainer">
                <div className="pokeball">
                    <img src={pokemonImage} alt={pokemonName} />
                </div>
            </div>
            <div className="pokemonDetails">
                <h4 className="pokemonId">{(pokemonId < 10) ? "000"+pokemonId : (pokemonId < 100) ? "00"+pokemonId : (pokemonId < 1000) ? "0"+pokemonId : ""+pokemonId}</h4>
                <h2 className="pokemonName">{pokemonName}</h2>
                <div className="pokemonType">
                    {pokemonType.map((type, index) => {
                        return (
                            <span key={index} className={`type ${type.type.name}`}>
                                {type.type.name}
                            </span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Pokemon