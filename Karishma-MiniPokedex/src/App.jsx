import { useState, useEffect } from 'react'
import './App.css'


function App() {
  const [pokemon, setPokemon] = useState({});
  const [pokemonId, setPokemonId] = useState(1);
  const [activeSection, setActiveSection] = useState('info')

  // Fetch Pokémon data
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      .catch((error) => console.error(error));
  }, [pokemonId]);
  
  // Functions to handle next and previous Pokémon
  const nextPokemon = () => setPokemonId((prev) => prev + 1);
  const prevPokemon = () => setPokemonId((prev) => Math.max(1, prev - 1));

  return (
    <div className="App">
      <h1>Bits of Good Mid-Semester Project</h1>

      <div className="pokedex">
        {/* Pokémon Display Section */}
        <div className="pokemon-display">
          <h2>{pokemon.name ? pokemon.name.toUpperCase() : 'Loading...'}</h2>
          <img
            src={pokemon.sprites?.front_default}
            alt={pokemon.name}
            width="200"
            height="200"
          />
          <p>Type: {pokemon.types?.map((type) => type.type.name).join(', ')}</p>
          {/* Navigation Buttons */}
        <div className="navigation">
          <button onClick={prevPokemon}>Previous</button>
          <button onClick={nextPokemon}>Next</button>
        </div>
        </div>

        {/* Info and Moves Section */}
        <div className="pokemon-info-card">
          {/* Buttons to Toggle Sections */}
          

          {/* Conditional Rendering Based on Active Section */}
          {activeSection === 'info' ? (
            <div>
              <h3>Info</h3>
              <p>Height: {pokemon.height}m</p>
              <p>Weight: {pokemon.weight}kg</p>
              <p>Base Experience: {pokemon.base_experience}</p>
              <p>HP: {pokemon.stats?.[0].base_stat}</p>
              <p>Attack: {pokemon.stats?.[1].base_stat}</p>
              <p>Defense: {pokemon.stats?.[2].base_stat}</p>
              <p>Special-Attack: {pokemon.stats?.[3].base_stat}</p>
              <p>Special-Defense: {pokemon.stats?.[4].base_stat}</p>
              <p>Speed: {pokemon.stats?.[5].base_stat}</p>
            </div>
          ) : (
            <div>
              <h3>Moves</h3>
              <ul>
                {pokemon.moves?.slice(0, 5).map((move, index) => (
                  <li key={index}>{move.move.name}</li>
                ))}
              </ul>
            </div>
          )}

<div className="section-buttons">
            <button
              className={`info-button ${activeSection === 'info' ? 'active' : ''}`}
              onClick={() => setActiveSection('info')}
            >
              Info
            </button>
            <button
              className={`moves-button ${activeSection === 'moves' ? 'active' : ''}`}
              onClick={() => setActiveSection('moves')}
            >
              Moves
            </button>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default App
