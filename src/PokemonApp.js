import React, { useState, useEffect } from 'react';

const PokemonApp = () => {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        const results = await Promise.all(data.results.map(async (item) => {
          const res = await fetch(item.url);
          return res.json();
        }));
        setPokemon(results);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pokemon Search</h1>
      <input
        type="text"
        placeholder="Search Pokemon..."
        className="w-full p-2 mb-4 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPokemon.map((p) => (
          <div key={p.id} className="border rounded p-4 flex flex-col items-center">
            <img 
              src={p.sprites.front_default} 
              alt={p.name} 
              className="w-32 h-32"
            />
            <h2 className="text-xl font-semibold mt-2 capitalize">{p.name}</h2>
            <p>Types: {p.types.map(t => t.type.name).join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonApp;