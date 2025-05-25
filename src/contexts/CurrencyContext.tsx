
import React, { useState, useContext, createContext } from "react";

// Translation context
type Language = "en" | "es" | "fr" | "de" | "zh";

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  settings: {
    en: "Settings",
    es: "Configuración",
    fr: "Paramètres",
    de: "Einstellungen",
    zh: "设置"
  },
  general: {
    en: "General",
    es: "General",
    fr: "Général",
    de: "Allgemein",
    zh: "通用"
  },
  currency: {
    en: "Currency",
    es: "Moneda",
    fr: "Devise",
    de: "Währung",
    zh: "货币"
  },
  language: {
    en: "Language Preference",
    es: "Preferencia de idioma",
    fr: "Préférence de langue",
    de: "Spracheinstellung",
    zh: "语言偏好"
  },
  country: {
    en: "Country",
    es: "País",
    fr: "Pays",
    de: "Land",
    zh: "国家"
  },
  saveChanges: {
    en: "Save Changes",
    es: "Guardar cambios",
    fr: "Enregistrer les modifications",
    de: "Änderungen speichern",
    zh: "保存更改"
  },
  settingsSaved: {
    en: "Settings Saved",
    es: "Configuración guardada",
    fr: "Paramètres enregistrés",
    de: "Einstellungen gespeichert",
    zh: "设置已保存"
  },
  settingsSavedDesc: {
    en: "Your general settings have been saved successfully.",
    es: "Su configuración general se ha guardado correctamente.",
    fr: "Vos paramètres généraux ont été enregistrés avec succès.",
    de: "Ihre allgemeinen Einstellungen wurden erfolgreich gespeichert.",
    zh: "您的常规设置已成功保存。"
  }
};

// Create a currency context
type CurrencyContextType = {
  currency: string;
  setCurrency: (currency: string) => void;
  currencySymbol: string;
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
};

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  setCurrency: () => {},
  currencySymbol: "$",
  language: "en",
  setLanguage: () => {},
  translate: () => "",
});

// Provider component that will be used in App.tsx
export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("currency") || "USD";
  });
  
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem("language") as Language) || "en";
  });

  const getCurrencySymbol = (currencyCode: string): string => {
    const symbols: { [key: string]: string } = {
      USD: "$", EUR: "€", GBP: "£", JPY: "¥", CAD: "C$",
      CHF: "CHF", CNY: "¥", SEK: "kr", NOK: "kr", DKK: "kr", PLN: "zł",
      CZK: "Kč", HUF: "Ft", RUB: "₽", INR: "₹", BRL: "R$", MXN: "$",
      ZAR: "R", SGD: "S$", HKD: "HK$", NZD: "NZ$", KRW: "₩", THB: "฿",
      MYR: "RM", PHP: "₱", IDR: "Rp", VND: "₫", TRY: "₺", AED: "د.إ",
      SAR: "﷼", QAR: "﷼", KWD: "د.ك", BHD: "د.ب", OMR: "﷼", JOD: "د.ا",
      LBP: "ل.ل", EGP: "£", MAD: "د.م.", TND: "د.ت", DZD: "د.ج",
      LYD: "ل.د", ETB: "Br", KES: "KSh", UGX: "USh", TZS: "TSh",
      GHS: "₵", NGN: "₦", XOF: "₣", XAF: "₣", CLP: "$", PEN: "S/",
      COP: "$", VES: "Bs", UYU: "$", PYG: "₲", BOB: "Bs", ARS: "$"
    };
    return symbols[currencyCode] || currencyCode;
  };

  const translate = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const handleSetCurrency = (newCurrency: string) => {
    setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency);
  };

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency: handleSetCurrency,
      currencySymbol: getCurrencySymbol(currency),
      language,
      setLanguage: handleSetLanguage,
      translate
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Hook to use the currency context
export const useCurrency = () => useContext(CurrencyContext);
