"use client";

import { useEffect, useState, FormEvent } from "react";
import PokemonCard from "./Card";

export type Pokemon = {
  id: number;
  name: string;
  sprites: Sprites;
  abilities: Ability[];
  types: Types[];
  stats: Stats[];
  species: {
    name: string;
    url: string;
  };
  abilitydetails: abilityDetails;
  generation: Generation;
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

export type abilityDetails = {
  name: string;
  effect_entries: {
    effect: string;
    short_effect: string;
    language: {
      name: string;
    };
  }[];
  names: {
    name: string;
    language: {
      name: string;
    };
  }[];
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
  };
};

export type StatDetails = {
  names: {
    name: string;
    language: {
      name: string;
    };
  }[];
}

export type Species = {
  generation: {
    name: string;
    url: string;
  };
};

export type Generation = {
  name: string;
  main_region: {
    name: string;
    url: string;
  };
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
};

export type Region = {
  name: string;
  pokedexes: {
    name: string;
    url: string;
  }[];
};

export type Pokedex = {
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
};



export default function PokemonBuscar() {
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState<Region | null>(null);
  const [generation, setGeneration] = useState<Generation | null>(null);
  const [species, setSpecies] = useState<Species | null>(null);
  const [abilityLan, setAbilityLan] = useState<abilityDetails | null>(null);
  const [statsLan, setStatsLan] = useState<StatDetails[] | null>(null);
  const [pokedexDetails, setPokedexDetails] = useState<Pokedex[] | null>(null);

  function handleClick(element: FormEvent<HTMLFormElement>) {
    element.preventDefault();
    setError("");
    setPokemon(null);
    setSearch(name.toLowerCase());
    setAbilityLan(null);
    setGeneration(null);
  }

  useEffect(() => {
    if (!search) return;

    async function fetchPokemon() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
        console.log(res);

        if (!res.ok) throw new Error();
        const data = await res.json();
        setPokemon(data);
      } catch {
        setError("No se encontró al pokemon");
      }
    }
    fetchPokemon();
  }, [search]);

  useEffect(() => {
    if (!pokemon?.species?.name) return;

    async function fetchRegion() {
      try {
        const speciesRes = await fetch(pokemon!.species.url);
        if (!speciesRes.ok) throw new Error();
        const species: Species = await speciesRes.json();

        const generationRes = await fetch(species.generation.url);
        if (!generationRes.ok) throw new Error();
        const generation: Generation = await generationRes.json();

        const regionRes = await fetch(generation.main_region.url);
        if (!regionRes.ok) throw new Error();
        const region: Region = await regionRes.json();

        setSpecies(species);
        setGeneration(generation);
        setRegion(region);
      } catch (err) {
        console.error("error de fetch", err);
        setRegion(null);
      }
    }

    fetchRegion();
  }, [pokemon]);

  useEffect(() => {
    if (!pokemon?.abilities?.[0]?.ability?.url) return;

    async function fetchAbility() {
      try {
        const abilityRes = await fetch(pokemon.abilities[0].ability.url);
        if (!abilityRes.ok) throw new Error();
        const abiliLan: abilityDetails = await abilityRes.json();

        setAbilityLan(abiliLan);
      } catch (err) {
        console.error("error fetch ability", err);
        setAbilityLan(null);
      }
    }

    fetchAbility();
  }, [pokemon?.abilities?.[0]?.ability?.url]);

  useEffect(() => {
    if (!pokemon?.generation?.url) return;

    async function fetchGenerationLan() {
      try {
        const generationRes = await fetch(pokemon.generation.url);
        if (!generationRes.ok) throw new Error();
        const generaLan: Generation = await generationRes.json();

        setGeneration(generaLan);
      } catch (err) {
        console.error("error fetch generation", err);
        setGeneration(null);
      }
    }

    fetchGenerationLan();
  }, [pokemon?.generation?.url]);

  useEffect(() => {
    if (!pokemon?.stats || pokemon.stats.length === 0) return;

    async function fetchStats() {
      try {
        const statsData: StatDetails[] = [];
        
        for (const stat of pokemon.stats) {
          const statRes = await fetch(stat.stat.url);
          if (!statRes.ok) throw new Error();
          const statDetail: StatDetails = await statRes.json();
          statsData.push(statDetail);
        }

        setStatsLan(statsData);
      } catch (err) {
        console.error("error fetch stats", err);
        setStatsLan(null);
      }
    }

    fetchStats();
  }, [pokemon?.stats]);

  useEffect(() => {
    if (!region?.pokedexes || region.pokedexes.length === 0) return;

    async function fetchPokedexDetails() {
      try {
        const pokedexData: Pokedex[] = [];
        
        for (const pokedex of region.pokedexes) {
          const pokedexRes = await fetch(pokedex.url);
          if (!pokedexRes.ok) throw new Error();
          const pokedexDetail: Pokedex = await pokedexRes.json();
          pokedexData.push(pokedexDetail);
        }

        setPokedexDetails(pokedexData);
      } catch (err) {
        console.error("error fetch pokedex details", err);
        setPokedexDetails(null);
      }
    }

    fetchPokedexDetails();
  }, [region?.pokedexes]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-blue-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
          Pokédex
        </h1>

        <form onSubmit={handleClick} className="flex gap-2 mb-8 justify-center">
          <input
            type="text"
            placeholder="Ej: ceruledge"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 border-pink-400 focus:outline-none focus:border-red-600 w-64 text-black placeholder-black/20"
          ></input>
          <button
            type="submit"
            className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
          >
            Buscar
          </button>
        </form>

        {error && (
          <p className="text-center text-red-600 font-bold text-lg mb-4">
            {error}
          </p>
        )}

        {pokemon && species && generation && region && abilityLan && statsLan && pokedexDetails && (
          <PokemonCard
            pokemon={pokemon}
            region={region}
            generation={generation}
            species={species}
            abilitydetails={abilityLan}
            statsLan={statsLan}
            pokedexDetails={pokedexDetails}
          />
        )}
      </div>
    </div>
  );
}
