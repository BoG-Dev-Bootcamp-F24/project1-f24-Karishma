import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState({});
  const [pokemonId, setPokemonId] = useState(1);
  const [activeSection, setActiveSection] = useState('info');

  const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      .catch((error) => console.error(error));
  }, [pokemonId]);

  const nextPokemon = () => setPokemonId((prev) => prev + 1);
  const prevPokemon = () => setPokemonId((prev) => Math.max(1, prev - 1));

  return (
    <div className="App">
      <h1>Bits of Good Mid-Semester Project</h1>

      <div className="pokedex">
        {/* Pokémon Display Section */}
        <div className="pokemon-display">
          <img className="pokemon-image"
            src={pokemon.sprites?.front_default}
            alt={pokemon.name}
            width="400px"
            height="400px"
          />
          <br></br>
          <div className="pokemon-name-card">
            <p>{pokemon.name ? pokemon.name.toUpperCase() : 'Loading...'}</p>
          </div>
          <div className="pokemon-types">
            <strong>Type: </strong>
            {pokemon.types?.map((typeObj, index) => (
              <span
                key={index}
                className="pokemon-type"
                style={{ backgroundColor: typeColors[typeObj.type.name] }}
              >
                {typeObj.type.name}
              </span>
            ))}
          </div>
          {/* Navigation Buttons */}
          <div className="navigation">
            <button onClick={prevPokemon}>{'<'}</button>
            <button onClick={nextPokemon}>{'>'}</button>
          </div>

        </div>

        {/* Info and Moves Section */}
        <div className="pokemon-info-section">
        <div className="pokemon-info-card">
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
        </div>
         {/* Info and Moves Buttons */}
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

export default App;
