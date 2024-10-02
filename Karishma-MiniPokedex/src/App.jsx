import { useState, useEffect } from 'react'
import '/Pokedex.css';
import '/App.css'
import axios from 'axios';


function App() {
  const [pokemon, setPokemon] = useState({});
  const [pokemonId, setPokemonId] = useState(1);

  // Fetch Pokémon data
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => setPokemon(response.data))
      .catch((error) => console.error(error));
  }, [pokemonId]);

  // Functions to handle next and previous Pokémon
  const nextPokemon = () => setPokemonId((prev) => prev + 1);
  const prevPokemon = () => setPokemonId((prev) => Math.max(1, prev - 1));

  return (
    <>
      <h1>Bits of Good Mid-Semester Project</h1>
      <div className="Pokemon-display-card">
        <button onClick={() => setCount((count) => count + 1)}>
          
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div className="Pokemon-info-card ">
      <div className="infocard" styles="width: 200px; height: 100px"></div>
      </div>

      <div className="pokedex">
      <div className="pokemon-display">
        <h2>{pokemon.name ? pokemon.name.toUpperCase() : 'Loading...'}</h2>
        <img
          src={pokemon.sprites?.front_default}
          alt={pokemon.name}
          width="200"
          height="200"
        />
        <p>Type: {pokemon.types?.map((type) => type.type.name).join(', ')}</p>
      </div>
      <div className="pokemon-details">
        <h3>Moves</h3>
        <ul>
          {pokemon.moves?.slice(0, 5).map((move, index) => (
            <li key={index}>{move.move.name}</li>
          ))}
        </ul>
      </div>
      <div className="navigation">
        <button onClick={prevPokemon}>Previous</button>
        <button onClick={nextPokemon}>Next</button>
      </div>
    </div>
      
    </>
  )
}

export default App
