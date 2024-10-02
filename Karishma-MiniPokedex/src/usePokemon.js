import { useState, useEffect } from 'react';
import axios from 'axios';

const usePokemon = () => {
  const [pokemon, setPokemon] = useState({});
  const [pokemonId, setPokemonId] = useState(1);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => setPokemon(response.data))
      .catch((error) => console.error(error));
  }, [pokemonId]);

  const nextPokemon = () => setPokemonId((prev) => prev + 1);
  const prevPokemon = () => setPokemonId((prev) => Math.max(1, prev - 1));

  return { pokemon, nextPokemon, prevPokemon };
};

export default usePokemon;
