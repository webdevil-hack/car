export const locales = ["en", "hi"]; // extensible
export type Locale = (typeof locales)[number];

export const messages: Record<Locale, Record<string, string>> = {
  en: {
    search_cars: "Search cars",
    explore_popular: "Explore popular",
  },
  hi: {
    search_cars: "कार खोजें",
    explore_popular: "लोकप्रिय देखें",
  },
};

export function t(locale: Locale, key: string): string {
  return messages[locale]?.[key] ?? key;
}
