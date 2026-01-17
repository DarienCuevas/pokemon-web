"use client";

import { useState } from "react";

type pokemon = {
  id: number;
  name: string;
  location_area_encounters: string;
  sprites: Sprites;
  abilities: Ability[];
  types: Types[];
};

type location = {
    location_area: {
        name: string;
    }
}

type Sprites = {
    front_default: string;
    front_shiny: string;
}

type Ability = {
    is_hidden: boolean;
    slot: number;
        ability: {
            name: string;
            url: string;
        }
}

type Types = {
    slot: number;
        type: {
            name: string;
            url: string;
    }
}

export default function PokemonBuscar() {
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState<pokemon | null>(null);
  const [error, setError] = useState("");
  const [locations, setLocations] = useState<location[]>([]);
  const [sprites, setSprites] = useState<Sprites | null>(null);
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [types, setTypes] = useState<Types[]>([]);

  async function handleClick(element: React.FormEvent<HTMLFormElement>) {
    element.preventDefault();
    setError("");
    setPokemon(null);

    try {
      const endpoint = `pokemon/${name.toLowerCase()}`;
      console.log(name.toLowerCase());
      console.log(`https://pokeapi.co/api/v2/&{endpoint}/`);

      //traigo datos del pokemon
      const resPokemon = await fetch(`https://pokeapi.co/api/v2/${endpoint}`);
      if (!resPokemon.ok) {
        throw new Error("Pokémon no encontrado");
      }

      //guardo datos del pokemon solicitados en type
      const data = await resPokemon.json();
      setPokemon(data);

      //locations
      const resLocations = await fetch(data.location_area_encounters);

      const localizacion = await resLocations.json();
      setLocations(localizacion);
      console.log(localizacion);

      //sprites
      setSprites(data.sprites);
      console.log(data.sprites);

      //abilities
      setAbilities(data.abilities);
      console.log(data.abilities);

        //types
        setTypes(data.types);
        console.log(data.types);
    }
    
    catch (error) {
      setError("no se encontró el pokemon");
    }
  }

  return (
    <div>
      <form onSubmit={handleClick}>
        <input
          type="text"
          placeholder="Ej: pikachu"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {error && <p>{error}</p>}

      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <p>id: {pokemon.id}</p>

          {locations.length > 0 && (
            <div>
              <h3>areas donde aparece:</h3>
              <ul>
                {locations.map((location, index) => (
                  <li key={index}>{location.location_area.name}</li>
                ))}
              </ul>
            </div>
          )}

          {sprites && (
            <div>
              <h3>Sprites:</h3>
              <img src={sprites.front_default} alt="default" />
              <img src={sprites.front_shiny} alt="shiny" />
            </div>
          )}

          {abilities.length > 0 && (
            <div>
              <h3>habilidades:</h3>
              <ul>
                {abilities.map((ability, index) => (
                  <li key={index}>{ability.ability.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
