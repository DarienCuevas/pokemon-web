"use client";

import { useEffect, useState, FormEvent } from "react";
import PokemonCard from "./Card";


export type Pokemon = {
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

export type Location = {
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
        ></input>
        <button type="submit">Buscar</button>
      </form>

      {error && <p>{error}</p>}

      {pokemon &&  (
          <PokemonCard
          pokemon={pokemon}
          locations={locations}
          />
      )}
          </div>
      
      );
    }

      
      
      
