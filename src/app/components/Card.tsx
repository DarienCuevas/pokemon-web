"use client";
import React, { useState } from "react";
import type { Pokemon, Species, Region, Generation, abilityDetails, StatDetails, Pokedex, TypeDetails } from "./PokemonBuscar";
import { getSpanishText, getAbilityDescriptionEs, getAbilityFlavorTextEs } from "@/lib/translate";

type PokemonCardProps = {
  pokemon: Pokemon;
  region: Region | null;
  species: Species;
  generation: Generation;
  abilitydetails?: abilityDetails | null;
  statsLan?: StatDetails[] | null;
  pokedexDetails?: Pokedex[] | null;
  typeDetails?: TypeDetails[] | null;
};

type Tab = "info" | "types" | "abilities" | "pokedex" | "stats";

export default function PokemonCard({
  pokemon,
  species,
  generation,
  region,
  abilitydetails,
  statsLan,
  pokedexDetails,
  typeDetails,
}: PokemonCardProps) {
  const [activeTab, setActiveTab] = useState<Tab>("info");

  if (!pokemon) {
    return null;
  }

  const generationNameEs = generation
    ? getSpanishText(generation.names, n => n.name, generation.name)
    : "";

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border-4 border-pink-400">
      <h2 className="text-3xl font-bold capitalize text-center text-red-600 mb-2">{pokemon.name}</h2>
      <p className="text-center text-gray-600 font-semibold mb-6">#{String(pokemon.id).padStart(3, "0")}</p>

      <div className="flex justify-center gap-4 mb-8">
        {pokemon.sprites.front_default && (
          <div className="bg-pink-100 rounded-lg p-4">
            <p className="text-black font-semibold">Normal: </p>
            <img src={pokemon.sprites.front_default} className="w-40 h-40" />
          </div>
        )}
        {pokemon.sprites.front_shiny && (
          <div className="bg-blue-100 rounded-lg p-4">
            <p className="text-black font-semibold">Shiny: </p>
            <img src={pokemon.sprites.front_shiny} className="w-40 h-40" />
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-full font-semibold ${activeTab === "info" ? "bg-pink-400 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("info")}
        >
          Info
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold ${activeTab === "types" ? "bg-pink-400 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("types")}
        >
          Tipos
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold ${activeTab === "abilities" ? "bg-pink-400 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("abilities")}
        >
          Habilidad
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold ${activeTab === "pokedex" ? "bg-pink-400 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("pokedex")}
        >
          Pokedex
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold ${activeTab === "stats" ? "bg-pink-400 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("stats")}
        >
          Estadísticas
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "info" && (
          <>
            {species && (
              <div className="mb-6">
                <p className="text-lg font-semibold text-gray-700">
                  <span className="text-red-600 font-bold">Generación: </span>
                  {generationNameEs}
                </p>
              </div>
            )}
            {generation && (
              <div className="mb-6">
                <p className="text-lg font-semibold text-gray-700">
                  <span className="text-red-600 font-bold">Región: </span>
                  {generation.main_region.name}
                </p>
              </div>
            )}
          </>
        )}

        {activeTab === "types" && (
          <>
            <h3 className="text-xl font-bold text-red-600 mb-4">Tipos: </h3>
            <div className="flex gap-2 mb-6 flex-wrap">
              {pokemon.types.map((t, idx) => {
                const typeDetail = typeDetails?.[idx];
                const spanishName = typeDetail?.names
                  ? getSpanishText(typeDetail.names, n => n.name, t.type.name)
                  : t.type.name;

                return (
                  <span
                    key={t.slot}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold capitalize"
                  >
                    {spanishName}
                  </span>
                );
              })}
            </div>
          </>
        )}

        {activeTab === "abilities" && abilitydetails && (
          <div className="mb-6 bg-purple-100 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-purple-600 mb-2">Habilidad: </h3>
            <p className="text-lg font-semibold text-gray-700 capitalize mb-2">
              {getSpanishText(abilitydetails.names || [], n => n.name, abilitydetails.name)}
            </p>

            {/* Flavor text de la habilidad en español */}
            {abilitydetails.flavor_text_entries && abilitydetails.flavor_text_entries.length > 0 && (
              <p className="text-gray-600 italic text-base leading-relaxed">
                "{getAbilityFlavorTextEs(abilitydetails)}"
              </p>
            )}
          </div>
        )}

        {activeTab === "pokedex" && region && pokedexDetails && (
          <div className="mb-6">
            <h3 className="text-xl font-bold text-red-600 mb-3">Pokedex</h3>
            <ul className="grid grid-cols-2 gap-2">
              {region.pokedexes.map((p, index) => (
                <li
                  key={p.name}
                  className="bg-pink-300 text-gray-800 px-4 py-2 rounded-lg font-semibold capitalize"
                >
                  {pokedexDetails[index]
                    ? getSpanishText(pokedexDetails[index].names || [], n => n.name, p.name)
                    : p.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "stats" && (
          <>
            <h3 className="text-xl font-bold text-red-600 mb-4">Estadísticas: </h3>
            <div className="space-y-3 mb-8">
              {pokemon.stats.map((st, index) => (
                <div key={st.stat.name} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-700 capitalize text-sm">
                      {statsLan && statsLan[index]
                        ? getSpanishText(statsLan[index].names || [], n => n.name, st.stat.name)
                        : st.stat.name}
                    </p>
                    <p className="text-gray-600 text-sm font-bold">{st.base_stat}</p>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-4">
                    <div
                      className="bg-red-600 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((st.base_stat / 150) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}