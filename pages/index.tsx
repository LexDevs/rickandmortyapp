import React, { useState } from 'react';
import CharacterList, { Character } from '../components/CharacterList';
import LocationDetails, { Location } from '../components/LocationDetails';

const Index: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const [locationDetails, setLocationDetails] = useState<Location | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchTermChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;

    setSearchTerm(term);

    if (term.trim() === '') {
      setSearchResults([]);
      return;
    }

    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${term}`);
    const data = await response.json();
    setSearchResults(data.results);
  };

  const handleLocationClick = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();

    setLocationDetails({
      name: data.name,
      url: data.url,
      residents: data.residents,
    });
  };

  return (
    <div>
      <h1>Rick and Morty</h1>

      <CharacterList characters={searchResults} onLocationClick={handleLocationClick} />

      {locationDetails && (
        <LocationDetails
          location={{
            name: locationDetails.name,
            url: locationDetails.url,
            residents: locationDetails.residents,
          }}
        />
      )}

      <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
    </div>
  );
};

export default Index;
