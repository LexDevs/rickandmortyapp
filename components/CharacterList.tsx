import React, { useState, useEffect } from 'react';

export interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
}

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchName, setSearchName] = useState<string>('');
  const [searchStatus, setSearchStatus] = useState<string>('');

  useEffect(() => {
    const fetchCharacters = async () => {
      let url = 'https://rickandmortyapi.com/api/character';
      if (searchName) {
        url += `?name=${searchName}`;
      }
      if (searchStatus) {
        url += searchName ? `&status=${searchStatus}` : `?status=${searchStatus}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setCharacters(data.results);
    };
    fetchCharacters();
  }, [searchName, searchStatus]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchStatus(e.target.value);
  };

  return (
    <div>
      <h2>Characters:</h2>
      <div className="search-container">
        <input type="text" placeholder="Search by name" value={searchName} onChange={handleNameChange} />
        <select value={searchStatus} onChange={handleStatusChange}>
          <option value="">All status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <ul className="character-list">
        {characters.map((character: Character) => (
          <li key={character.id}>
            <img src={character.image} alt={character.name}/>
            <div className="character-details">
              <p>{character.name}</p>
              <p>{character.status}</p>
              <p className="character-origin"><span>Origin:</span> {character.origin.name} - {character.origin.url}</p>
              <p className="character-location"><span>Location:</span> {character.location.name} - {character.location.url}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;
