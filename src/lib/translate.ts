type WithLanguage = {
  language: {
    name: string;
  };
};

export function getSpanishText<T extends WithLanguage>(
  items: T[],
  extractor: (item: T) => string,
  fallback = ""
): string {
  const es = items.find(item => item.language.name === "es");
  if (es) return extractor(es);

  return items.length ? extractor(items[0]) : fallback;
}

// Función específica para obtener descripción de habilidad en español
export function getAbilityDescriptionEs(ability: {
  effect_entries: {
    effect: string;
    short_effect: string;
    language: {
      name: string;
    };
  }[];
}): string {
  const esEntry = ability.effect_entries.find(
    e => e.language.name === "es"
  );

  if (!esEntry) return "";

  return esEntry.effect || esEntry.short_effect;
}
// Función para obtener el flavor text de la habilidad en español
export function getAbilityFlavorTextEs(ability: {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    }
    version_group?: {
      name: string;
      url: string;
    }
  }[]
}): string {
  const esEntry = ability.flavor_text_entries.find(
    e => e.language.name === "es"
  );

  if (!esEntry) return "";

  // Limpia el texto de saltos de línea y espacios extra
  return esEntry.flavor_text.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
}