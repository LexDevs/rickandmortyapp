import React from 'react';

export interface Location {
  name: string;
  url: string;
  residents: string[];
}

interface Props {
  location: Location | null;
}

const LocationDetails: React.FC<Props> = ({ location }) => {
  if (!location) {
    return <div>Loading...</div>;
  }

  const { name, url } = location;

  return (
    <div>
      <h2>Location Details:</h2>
      <ul>
        <li>
          <strong>Origin:</strong>
          <ul>
            <li>Name: {name}</li>
            <li>URL: {url}</li>
          </ul>
        </li>
        <li>
          <strong>Location:</strong>
          <ul>
            <li>Name: {location.name}</li>
            <li>URL: {location.url}</li>
          </ul>
        </li>
        <li>
          <strong>Episodes:</strong>
          <ul>
            {location.residents &&
              location.residents.map(resident => (
                <li key={resident}>{resident}</li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default LocationDetails;
