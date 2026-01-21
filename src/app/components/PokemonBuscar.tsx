"use client";

import { useEffect, useState, FormEvent } from "react";

type Pokemon = {
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
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [search, setSearch] = useState("")

  function handleClick(element: FormEvent<HTMLFormElement>) {
    element.preventDefault();
    setError("");
    setPokemon(null);
    setLocations([]);
    setSearch(name.toLowerCase());
  }

    useEffect (() => {
      if (!search) return;

      async function fetchPokemon () {
        try {
          const res = await fetch((`https://pokeapi.co/api/v2/pokemon/${search}`))

        if (!res.ok) throw new Error()
          const data = await res.json()
        setPokemon(data);
      } catch {
        setError ("No se encontró al pokemon")
      }
    };
    fetchPokemon()
  }, [search])

  useEffect (() => {
    if (!pokemon) return;
    const pokemonActual = pokemon

    async function fetchLocations () {
      const res = await fetch(pokemonActual.location_area_encounters)
      const data = await res.json();
      setLocations(data)
    }
    fetchLocations()
  }, [pokemon])
  

  return (
    <div>
      <form onSubmit={handleClick}>
        <input
          type="text"
          placeholder="Ej: ceruledge"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {error && <p>{error}</p>}

      {pokemon &&  (
        <div>
          <h2>Nombre: {pokemon.name}</h2>
          <h2>Numero de pokedex: {pokemon.id}</h2>

          <strong>Normal: </strong><img src={pokemon.sprites.front_default}></img>
          <strong>Shiny: </strong><img src={pokemon.sprites.front_shiny}></img>

        <h2>Tipos:</h2>
        {pokemon.types.map(t => (
          <p key={t.slot}> {t.type.name}</p>
        ))}

      <h2>Estadisticas: </h2>
      {pokemon.stats.map(st => (
          <p key={st.stat.name}>
            {st.stat.name}: {st.base_stat}
          </p>
      ))}

      
      {locations.length > 0 && (
        <div>
          <h2>Encuentros:</h2>
          <ul>
          {locations.map((loc, index) => (
            <div key={index}>
              <h4>Area:{loc.location_area.name}</h4>

              {loc.version_details.map((version, vIndex) => (
                <div key={vIndex}>
                  <p>Juego: {version.version.name}</p>

                  {version.encounter_details.map((encounter, eIndex) => (
                    <div key={eIndex}>
                      <p>Metodo: {encounter.method.name}</p>

                    {encounter.condition_values.length > 0 && (
                      <ul>
                        {encounter.condition_values.map((cond, cIndex) => (
                          <li key={cIndex}>
                            {cond.name}
                          </li>
                        ))}
                      </ul>
                    )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
          </ul>
        </div>
      )}

        </div>
      )}
    </div>
  );
}
