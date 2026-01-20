"use client";

import { useState } from "react";

type pokemon = {
  id: number;
  name: string;
  location_area_encounters: string;
  sprites: Sprites;
  abilities: Ability[];
  types: Types[];
  stats: Stats[];
};

type Sprites = {
  front_default: string;
  front_shiny: string;
};

type Ability = {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
};

type Types = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type Stats = {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
};

type Location = {
  location_area: {
    name: string;
  };
  version_details: {
    version: {
      name: string;
      url: string;
    };
    encounter_details: {
      method: {
        name: string;
      };
      condition_values: {
        name: string;
      }[];
    }[];
  }[];
};

export default function PokemonBuscar() {
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState<pokemon | null>(null);
  const [error, setError] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [sprites, setSprites] = useState<Sprites | null>(null);
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [types, setTypes] = useState<Types[]>([]);
  const [stats, setStats] = useState<Stats[]>([]);

  async function handleClick(element: React.FormEvent<HTMLFormElement>) {
    element.preventDefault();
    setError("");
    setPokemon(null);

    try {
      const endpoint = `pokemon/${name.toLowerCase()}`;
      console.log(name.toLowerCase());
      console.log(`https://pokeapi.co/api/v2/${endpoint}/`);

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
      console.log("location:", locations);
      setLocations(localizacion);
      console.log(localizacion);

      //sprites
      console.log("sprites:", sprites);
      setSprites(data.sprites);
      console.log(data.sprites);

      //abilities
      console.log("abilities:", abilities);
      setAbilities(data.abilities);
      console.log(data.abilities);

      //types
      console.log("types:", types);
      setTypes(data.types);
      console.log(data.types);

      //stats
      console.log("stats:", stats);
      setStats(data.stats);
      console.log(data.types);
    } catch (error) {
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
    <h3>Método de encuentro:</h3>
    <ul>
      {locations.map((location, index) => (
        <li key={index}>
          Area: {location.location_area.name}

          {location.version_details.map((version, vIndex) => (
            <div key={vIndex}>
              <p>Version: {version.version.name}</p>

              {version.encounter_details.map((encounter, eIndex) => (
                <div key={eIndex}>
                  <p>Método: {encounter.method.name}</p>

                  {encounter.condition_values.map((condition, cIndex) => (
                    <p key={cIndex}>
                      Condición: {condition.name}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </li>
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

          {types.length > 0 && (
            <div>
              <h3>Tipo:</h3>
              <ul>
                {types.map((type, index) => (
                  <li key={index}>{type.type.name}</li>
                ))}
              </ul>
            </div>
          )}

          {stats.map((stat, index) => (
            <div key={index}>
              <p>{stat.stat.name}</p>
              <p>{stat.base_stat}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
