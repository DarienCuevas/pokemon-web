"use client"

import { useEffect} from "react";

export default function pokemonList() {

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=200")
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error("Error fetching Pokémon data:", error));
    })
}