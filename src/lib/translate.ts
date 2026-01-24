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
