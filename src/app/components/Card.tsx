"use client";
import type {Pokemon, Location, Species, Region, Generation} from "./PokemonBuscar"

type PokemonCardProps = {
    pokemon: Pokemon;
    locations: Location[];
    region: Region | null;
    species: Species;
    generation: Generation;
    
}


export default function PokemonCard({ pokemon, locations, species, generation, region}: PokemonCardProps) {
    if (!pokemon) {
        return null;
    }
  return (
    <div>
      <h2>Nombre: {pokemon.name}</h2>

      <p>Numero pokedex: {pokemon.id}</p>

      <div>
        {pokemon.sprites.front_default && (
          <img src={pokemon.sprites.front_default} />
        )}
        {pokemon.sprites.front_shiny && (
          <img src={pokemon.sprites.front_shiny} />
        )}
      </div>

      <h3>Tipos:</h3>
      <div>
        {pokemon.types.map(t => (
          <li key={t.slot}>{t.type.name}
            </li>
        ))}
      </div>
      

        {species && (
          <p>generacion: {species.generation.name}</p>
        )}

        {generation && (
          <p>region principal: {generation.main_region.name}</p>
        )}

        {region && (
          <div>
            <h3>pokedex</h3>
            <ul>
              {region.pokedexes.map((p) => (
                <li key={p.name}>
                  {p.name}
                </li>
              ))}
            </ul>
          </div>
        )}

      <h3>Estadísticas:</h3>
      <ul>
        {pokemon.stats.map(st => (
          <li key={st.stat.name}>
            {st.stat.name}: {st.base_stat}
          </li>
        ))}
      </ul>


      {locations.length > 0 && (
        <>
          <h3>Encuentros:</h3>
          {locations.map((loc, index) => (
            <div key={index}>
              <strong>{loc.location_area.name}</strong>

              {loc.version_details.map((version, vIndex) => (
                <div key={vIndex}>
                  <p>Juego: {version.version.name}</p>

                  {version.encounter_details.map((encounter, eIndex) => (
                    <div key={eIndex}>
                      <p>Método: {encounter.method.name}</p>

                      {encounter.condition_values.length > 0 && (
                        <ul>
                          {encounter.condition_values.map((cond, cIndex) => (
                            <li key={cIndex}>{cond.name}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  )
}

