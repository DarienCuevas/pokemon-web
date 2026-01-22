"use client";
import type {Pokemon, Location} from "./PokemonBuscar"

type PokemonCardProps = {
    pokemon: Pokemon
    locations: Location[]
}


export default function PokemonCard({ pokemon, locations }: PokemonCardProps) {
    if (!pokemon) {
        return null;
    }
  return (
    <div>
      <h2>{pokemon.name}</h2>
      <p> {pokemon.id}</p>

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
          <span key={t.slot}>
            {t.type.name}
            </span>
        ))}
      </div>

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

