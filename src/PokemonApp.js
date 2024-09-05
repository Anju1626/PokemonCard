import React, { useState, useEffect } from 'react';
import './PokemonApp.css'; // We'll create this file for custom CSS

const PokemonApp = () => {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pokemon-app">
      <header className="app-header">
        <h1 className="app-title">Pokédex</h1>
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>
      {loading ? (
        <div className="loading">Loading Pokémon...</div>
      ) : (
        <div className="pokemon-grid">
          {filteredPokemon.map((p) => (
            <div key={p.id} className="pokemon-card">
              <div className="pokemon-image-container">
                <img 
                  src={p.sprites.front_default} 
                  alt={p.name} 
                  className="pokemon-image"
                />
              </div>
              <div className="pokemon-info">
                <h2 className="pokemon-name">{p.name}</h2>
                <div className="pokemon-types">
                  {p.types.map(t => (
                    <span key={t.type.name} className={`type-badge ${t.type.name}`}>
                      {t.type.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonApp;