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
  species: {
    name: string;
    url: string;
  }
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

  export type Species = {
    generation: {
      name: string;
      url: string;
    }
  }

  export type Generation = {
    name: string;
    main_region: {
      name: string;
      url: string;
    }
  }

  export type Region = {
    name: string; 
    pokedexes: {
      name: string;
      url: string;
    }[];
  }

export default function PokemonBuscar() {
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [search, setSearch] = useState("")
  const [region, setRegion] = useState<Region | null>(null);
  const [generation, setGeneration] = useState<Generation | null>(null);
  const [species, setSpecies] = useState<Species | null>(null);


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
          console.log(res)

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

    async function fetchLocations () {
      try {
      const res = await fetch(pokemon!.location_area_encounters)

      if(!res.ok) throw new Error()
      const data = await res.json();
      setLocations(data)
    } catch {
      setError("No se encontró ninguna localizacion")
    }
    };
    fetchLocations()
  }, [pokemon])

  useEffect (() => {
    if(!pokemon?.species?.name) return;

    async function fetchRegion () {
      try {
        const speciesRes = await fetch (pokemon!.species.name);
        if(!speciesRes.ok) throw new Error();
        const species: Species = await speciesRes.json();
        
        const generationRes = await fetch(species.generation.name)
        if(!generationRes.ok) throw new Error();
        const generation: Generation = await generationRes.json();

        const regionRes =  await fetch(generation.main_region.name);
        if(!regionRes.ok) throw new Error();
        const region: Region = await regionRes.json();

        setRegion(region);
        setGeneration(generation);
        setSpecies(species);

      } catch(err) {
        console.error("error de fetchin", err);
        setRegion(null);
      }
    }

    fetchRegion();
  }, [pokemon]);

  

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

      {pokemon &&  species && generation && region &&(
          <PokemonCard
          pokemon={pokemon}
          locations={locations}
          region={region}
          generation={generation}
          species={species}
          />
      )}
          </div>
      
      );
    }

      
      
      
