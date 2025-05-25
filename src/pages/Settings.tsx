import React, { useState, useContext, createContext } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { 
  Settings as SettingsIcon, 
  CreditCard, 
  UserCircle, 
  Building2, 
  AlertTriangle,
  ShieldCheck
} from "lucide-react";
import { Link } from "react-router-dom";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";

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

const currencies = [
  { code: "USD", name: "US Dollar" }, { code: "EUR", name: "Euro" }, { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" }, { code: "CAD", name: "Canadian Dollar" }, { code: "AUD", name: "Australian Dollar" },
  { code: "CHF", name: "Swiss Franc" }, { code: "CNY", name: "Chinese Yuan" }, { code: "SEK", name: "Swedish Krona" },
  { code: "NOK", name: "Norwegian Krone" }, { code: "DKK", name: "Danish Krone" }, { code: "PLN", name: "Polish Zloty" },
  { code: "CZK", name: "Czech Koruna" }, { code: "HUF", name: "Hungarian Forint" }, { code: "RUB", name: "Russian Ruble" },
  { code: "INR", name: "Indian Rupee" }, { code: "BRL", name: "Brazilian Real" }, { code: "MXN", name: "Mexican Peso" },
  { code: "ZAR", name: "South African Rand" }, { code: "SGD", name: "Singapore Dollar" }, { code: "HKD", name: "Hong Kong Dollar" },
  { code: "NZD", name: "New Zealand Dollar" }, { code: "KRW", name: "South Korean Won" }, { code: "THB", name: "Thai Baht" },
  { code: "MYR", name: "Malaysian Ringgit" }, { code: "PHP", name: "Philippine Peso" }, { code: "IDR", name: "Indonesian Rupiah" },
  { code: "VND", name: "Vietnamese Dong" }, { code: "TRY", name: "Turkish Lira" }, { code: "AED", name: "UAE Dirham" },
  { code: "SAR", name: "Saudi Riyal" }, { code: "QAR", name: "Qatari Riyal" }, { code: "KWD", name: "Kuwaiti Dinar" },
  { code: "BHD", name: "Bahraini Dinar" }, { code: "OMR", name: "Omani Rial" }, { code: "JOD", name: "Jordanian Dinar" },
  { code: "LBP", name: "Lebanese Pound" }, { code: "EGP", name: "Egyptian Pound" }, { code: "MAD", name: "Moroccan Dirham" },
  { code: "TND", name: "Tunisian Dinar" }, { code: "DZD", name: "Algerian Dinar" }, { code: "LYD", name: "Libyan Dinar" },
  { code: "ETB", name: "Ethiopian Birr" }, { code: "KES", name: "Kenyan Shilling" }, { code: "UGX", name: "Ugandan Shilling" },
  { code: "TZS", name: "Tanzanian Shilling" }, { code: "GHS", name: "Ghanaian Cedi" }, { code: "NGN", name: "Nigerian Naira" },
  { code: "XOF", name: "West African CFA Franc" }, { code: "XAF", name: "Central African CFA Franc" },
  { code: "CLP", name: "Chilean Peso" }, { code: "PEN", name: "Peruvian Sol" }, { code: "COP", name: "Colombian Peso" },
  { code: "VES", name: "Venezuelan Bolívar" }, { code: "UYU", name: "Uruguayan Peso" }, { code: "PYG", name: "Paraguayan Guaraní" },
  { code: "BOB", name: "Bolivian Boliviano" }, { code: "ARS", name: "Argentine Peso" }
];

const countries = [
  { code: "AF", name: "Afghanistan" }, { code: "AL", name: "Albania" }, { code: "DZ", name: "Algeria" },
  { code: "AS", name: "American Samoa" }, { code: "AD", name: "Andorra" }, { code: "AO", name: "Angola" },
  { code: "AI", name: "Anguilla" }, { code: "AQ", name: "Antarctica" }, { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" }, { code: "AM", name: "Armenia" }, { code: "AW", name: "Aruba" },
  { code: "AU", name: "Australia" }, { code: "AT", name: "Austria" }, { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" }, { code: "BH", name: "Bahrain" }, { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" }, { code: "BY", name: "Belarus" }, { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" }, { code: "BJ", name: "Benin" }, { code: "BM", name: "Bermuda" },
  { code: "BT", name: "Bhutan" }, { code: "BO", name: "Bolivia" }, { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" }, { code: "BV", name: "Bouvet Island" }, { code: "BR", name: "Brazil" },
  { code: "IO", name: "British Indian Ocean Territory" }, { code: "BN", name: "Brunei Darussalam" },
  { code: "BG", name: "Bulgaria" }, { code: "BF", name: "Burkina Faso" }, { code: "BI", name: "Burundi" },
  { code: "KH", name: "Cambodia" }, { code: "CM", name: "Cameroon" }, { code: "CA", name: "Canada" },
  { code: "CV", name: "Cape Verde" }, { code: "KY", name: "Cayman Islands" }, { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" }, { code: "CL", name: "Chile" }, { code: "CN", name: "China" },
  { code: "CX", name: "Christmas Island" }, { code: "CC", name: "Cocos (Keeling) Islands" }, { code: "CO", name: "Colombia" },
  { code: "KM", name: "Comoros" }, { code: "CG", name: "Congo" }, { code: "CD", name: "Congo, Democratic Republic" },
  { code: "CK", name: "Cook Islands" }, { code: "CR", name: "Costa Rica" }, { code: "CI", name: "Cote D'Ivoire" },
  { code: "HR", name: "Croatia" }, { code: "CU", name: "Cuba" }, { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" }, { code: "DK", name: "Denmark" }, { code: "DJ", name: "Djibouti" },
  { code: "DM", name: "Dominica" }, { code: "DO", name: "Dominican Republic" }, { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" }, { code: "SV", name: "El Salvador" }, { code: "GQ", name: "Equatorial Guinea" },
  { code: "ER", name: "Eritrea" }, { code: "EE", name: "Estonia" }, { code: "ET", name: "Ethiopia" },
  { code: "FK", name: "Falkland Islands" }, { code: "FO", name: "Faroe Islands" }, { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" }, { code: "FR", name: "France" }, { code: "GF", name: "French Guiana" },
  { code: "PF", name: "French Polynesia" }, { code: "TF", name: "French Southern Territories" }, { code: "GA", name: "Gabon" },
  { code: "GM", name: "Gambia" }, { code: "GE", name: "Georgia" }, { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" }, { code: "GI", name: "Gibraltar" }, { code: "GR", name: "Greece" },
  { code: "GL", name: "Greenland" }, { code: "GD", name: "Grenada" }, { code: "GP", name: "Guadeloupe" },
  { code: "GU", name: "Guam" }, { code: "GT", name: "Guatemala" }, { code: "GG", name: "Guernsey" },
  { code: "GN", name: "Guinea" }, { code: "GW", name: "Guinea-Bissau" }, { code: "GY", name: "Guyana" },
  { code: "HT", name: "Haiti" }, { code: "HM", name: "Heard Island & Mcdonald Islands" }, { code: "VA", name: "Holy See (Vatican)" },
  { code: "HN", name: "Honduras" }, { code: "HK", name: "Hong Kong" }, { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" }, { code: "IN", name: "India" }, { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran" }, { code: "IQ", name: "Iraq" }, { code: "IE", name: "Ireland" },
  { code: "IM", name: "Isle Of Man" }, { code: "IL", name: "Israel" }, { code: "IT", name: "Italy" },
  { code: "JM", name: "Jamaica" }, { code: "JP", name: "Japan" }, { code: "JE", name: "Jersey" },
  { code: "JO", name: "Jordan" }, { code: "KZ", name: "Kazakhstan" }, { code: "KE", name: "Kenya" },
  { code: "KI", name: "Kiribati" }, { code: "KR", name: "Korea" }, { code: "KW", name: "Kuwait" },
  { code: "KG", name: "Kyrgyzstan" }, { code: "LA", name: "Lao People's Democratic Republic" }, { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" }, { code: "LS", name: "Lesotho" }, { code: "LR", name: "Liberia" },
  { code: "LY", name: "Libyan Arab Jamahiriya" }, { code: "LI", name: "Liechtenstein" }, { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" }, { code: "MO", name: "Macao" }, { code: "MK", name: "Macedonia" },
  { code: "MG", name: "Madagascar" }, { code: "MW", name: "Malawi" }, { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" }, { code: "ML", name: "Mali" }, { code: "MT", name: "Malta" },
  { code: "MH", name: "Marshall Islands" }, { code: "MQ", name: "Martinique" }, { code: "MR", name: "Mauritania" },
  { code: "MU", name: "Mauritius" }, { code: "YT", name: "Mayotte" }, { code: "MX", name: "Mexico" },
  { code: "FM", name: "Micronesia" }, { code: "MD", name: "Moldova" }, { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" }, { code: "ME", name: "Montenegro" }, { code: "MS", name: "Montserrat" },
  { code: "MA", name: "Morocco" }, { code: "MZ", name: "Mozambique" }, { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" }, { code: "NR", name: "Nauru" }, { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" }, { code: "AN", name: "Netherlands Antilles" }, { code: "NC", name: "New Caledonia" },
  { code: "NZ", name: "New Zealand" }, { code: "NI", name: "Nicaragua" }, { code: "NE", name: "Niger" },
  { code: "NG", name: "Nigeria" }, { code: "NU", name: "Niue" }, { code: "NF", name: "Norfolk Island" },
  { code: "MP", name: "Northern Mariana Islands" }, { code: "NO", name: "Norway" }, { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" }, { code: "PW", name: "Palau" }, { code: "PS", name: "Palestine" },
  { code: "PA", name: "Panama" }, { code: "PG", name: "Papua New Guinea" }, { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" }, { code: "PH", name: "Philippines" }, { code: "PN", name: "Pitcairn" },
  { code: "PL", name: "Poland" }, { code: "PT", name: "Portugal" }, { code: "PR", name: "Puerto Rico" },
  { code: "QA", name: "Qatar" }, { code: "RE", name: "Reunion" }, { code: "RO", name: "Romania" },
  { code: "RU", name: "Russian Federation" }, { code: "RW", name: "Rwanda" }, { code: "BL", name: "Saint Barthelemy" },
  { code: "SH", name: "Saint Helena" }, { code: "KN", name: "Saint Kitts And Nevis" }, { code: "LC", name: "Saint Lucia" },
  { code: "MF", name: "Saint Martin" }, { code: "PM", name: "Saint Pierre And Miquelon" }, { code: "VC", name: "Saint Vincent And Grenadines" },
  { code: "WS", name: "Samoa" }, { code: "SM", name: "San Marino" }, { code: "ST", name: "Sao Tome And Principe" },
  { code: "SA", name: "Saudi Arabia" }, { code: "SN", name: "Senegal" }, { code: "RS", name: "Serbia" },
  { code: "SC", name: "Seychelles" }, { code: "SL", name: "Sierra Leone" }, { code: "SG", name: "Singapore" },
  { code: "SK", name: "Slovakia" }, { code: "SI", name: "Slovenia" }, { code: "SB", name: "Solomon Islands" },
  { code: "SO", name: "Somalia" }, { code: "ZA", name: "South Africa" }, { code: "GS", name: "South Georgia And Sandwich Isl." },
  { code: "ES", name: "Spain" }, { code: "LK", name: "Sri Lanka" }, { code: "SD", name: "Sudan" },
  { code: "SR", name: "Suriname" }, { code: "SJ", name: "Svalbard And Jan Mayen" }, { code: "SZ", name: "Swaziland" },
  { code: "SE", name: "Sweden" }, { code: "CH", name: "Switzerland" }, { code: "SY", name: "Syrian Arab Republic" },
  { code: "TW", name: "Taiwan" }, { code: "TJ", name: "Tajikistan" }, { code: "TZ", name: "Tanzania" },
  { code: "TH", name: "Thailand" }, { code: "TL", name: "Timor-Leste" }, { code: "TG", name: "Togo" },
  { code: "TK", name: "Tokelau" }, { code: "TO", name: "Tonga" }, { code: "TT", name: "Trinidad And Tobago" },
  { code: "TN", name: "Tunisia" }, { code: "TR", name: "Turkey" }, { code: "TM", name: "Turkmenistan" },
  { code: "TC", name: "Turks And Caicos Islands" }, { code: "TV", name: "Tuvalu" }, { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" }, { code: "AE", name: "United Arab Emirates" }, { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" }, { code: "UM", name: "United States Outlying Islands" }, { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" }, { code: "VU", name: "Vanuatu" }, { code: "VE", name: "Venezuela" },
  { code: "VN", name: "Viet Nam" }, { code: "VG", name: "Virgin Islands, British" }, { code: "VI", name: "Virgin Islands, U.S." },
  { code: "WF", name: "Wallis And Futuna" }, { code: "EH", name: "Western Sahara" }, { code: "YE", name: "Yemen" },
  { code: "ZM", name: "Zambia" }, { code: "ZW", name: "Zimbabwe" }
];

const Settings = () => {
  const { toast } = useToast();
  const { currency, setCurrency, language, setLanguage, translate } = useCurrency();
  const [country, setCountry] = useState(() => {
    return localStorage.getItem("country") || "US";
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(() => {
    return localStorage.getItem("twoFactorEnabled") === "true";
  });
  const [orgDetails, setOrgDetails] = useState({
    name: "",
    address: "",
    phone: "",
    type: "company",
    industry: "",
    size: "",
    description: ""
  });
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [currentPlan, setCurrentPlan] = useState("Free");
  const [nextBillingDate, setNextBillingDate] = useState("N/A");

  const handleSaveGeneralSettings = () => {
    // Save all settings to localStorage
    localStorage.setItem("currency", currency);
    localStorage.setItem("language", language);
    localStorage.setItem("country", country);
    localStorage.setItem("twoFactorEnabled", twoFactorEnabled.toString());
    
    toast({
      title: translate("settingsSaved"),
      description: translate("settingsSavedDesc"),
    });
  };

  const handleSaveOrgSettings = () => {
    toast({
      title: "Organization Settings Saved",
      description: "Your organization details have been saved successfully.",
    });
  };

  const handleUpgradePlan = () => {
    toast({
      title: "Redirecting to Upgrade",
      description: "You will be redirected to upgrade your subscription.",
    });
    // Redirect logic would go here
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast({
        title: "Account Deletion Requested",
        description: "Your account deletion request has been submitted.",
        variant: "destructive"
      });
      // Actual deletion logic would go here
    }
  };

  const handleSaveAccountSettings = () => {
    if (!termsAgreed) {
      toast({
        title: "Agreement Required",
        description: "You must agree to the terms of service to save account settings.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Account Settings Saved",
      description: "Your account settings have been saved successfully.",
    });
  };

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{translate("settings")}</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            {translate("general")}
          </TabsTrigger>
          <TabsTrigger value="organization" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Organization
          </TabsTrigger>
          <TabsTrigger value="current-plan" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Current Plan
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <UserCircle className="h-4 w-4" />
            Account
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your general application settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <Label htmlFor="currency">{translate("currency")}</Label>
                <Select 
                  value={currency} 
                  onValueChange={(value) => setCurrency(value)}
                >
                  <SelectTrigger className="w-full md:w-[300px]">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((curr) => (
                      <SelectItem key={curr.code} value={curr.code}>
                        {curr.code} - {curr.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="language">{translate("language")}</Label>
                <Select 
                  value={language} 
                  onValueChange={(value) => setLanguage(value as Language)}
                >
                  <SelectTrigger className="w-full md:w-[240px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="country">{translate("country")}</Label>
                <Select 
                  value={country} 
                  onValueChange={setCountry}
                >
                  <SelectTrigger className="w-full md:w-[300px]">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="2fa">Two-Factor Authentication (2FA)</Label>
                <div className="flex items-center gap-4">
                  <Switch 
                    id="2fa"
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                  <div>
                    <p className="text-sm font-medium">{twoFactorEnabled ? "Enabled" : "Disabled"}</p>
                    <p className="text-sm text-muted-foreground">
                      {twoFactorEnabled 
                        ? "Your account is protected with 2FA." 
                        : "Enable 2FA for additional security."}
                    </p>
                  </div>
                </div>
                {twoFactorEnabled && (
                  <div className="flex items-center gap-2 pt-2">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-green-600">2FA is active on this account</span>
                  </div>
                )}
              </div>
              
              <Button onClick={handleSaveGeneralSettings}>
                {translate("saveChanges")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="organization">
          <Card>
            <CardHeader>
              <CardTitle>Organization Details</CardTitle>
              <CardDescription>
                Manage your organization or individual profile information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input
                    id="orgName"
                    placeholder="Enter organization name"
                    value={orgDetails.name}
                    onChange={(e) => setOrgDetails({...orgDetails, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="orgType">Organization Type</Label>
                  <RadioGroup 
                    value={orgDetails.type}
                    onValueChange={(value) => setOrgDetails({...orgDetails, type: value})}
                    className="flex items-center gap-6 pt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="company" id="company" />
                      <Label htmlFor="company">Company</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual">Individual</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="non-profit" id="non-profit" />
                      <Label htmlFor="non-profit">Non-Profit</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="industry">Industry</Label>
                  <Select 
                    value={orgDetails.industry} 
                    onValueChange={(value) => setOrgDetails({...orgDetails, industry: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="orgSize">Company Size</Label>
                  <Select 
                    value={orgDetails.size} 
                    onValueChange={(value) => setOrgDetails({...orgDetails, size: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501+">501+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="orgAddress">Address</Label>
                  <Textarea
                    id="orgAddress"
                    placeholder="Enter organization address"
                    value={orgDetails.address}
                    onChange={(e) => setOrgDetails({...orgDetails, address: e.target.value})}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="orgPhone">Phone</Label>
                  <Input
                    id="orgPhone"
                    placeholder="Enter phone number"
                    value={orgDetails.phone}
                    onChange={(e) => setOrgDetails({...orgDetails, phone: e.target.value})}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="orgDescription">Description</Label>
                  <Textarea
                    id="orgDescription"
                    placeholder="Enter organization description"
                    value={orgDetails.description}
                    onChange={(e) => setOrgDetails({...orgDetails, description: e.target.value})}
                    className="min-h-[100px]"
                  />
                </div>
                
                <Button type="button" onClick={handleSaveOrgSettings}>
                  Save Organization Details
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="current-plan">
          <Card>
            <CardHeader>
              <CardTitle>Current Subscription Plan</CardTitle>
              <CardDescription>
                View and manage your current subscription plan.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-4 bg-muted/30">
                <div className="font-medium text-lg mb-2">Current Plan: {currentPlan}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Next Billing Date</p>
                    <p>{nextBillingDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                    <p>Credit Card (•••• 4242)</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Plan Features</h3>
                <ul className="space-y-2">
                  {currentPlan === "Free" && (
                    <>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Manage up to 1 active project
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Invite up to 5 team members
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Upload and share documents (limited to 1GB)
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Email notifications for tasks and updates
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        5GB storage limit
                      </li>
                    </>
                  )}
                  {currentPlan === "Basic" && (
                    <>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Manage up to 5 active projects
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Invite up to 15 team members
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Gantt chart view
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Calendar integration
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        20GB storage limit
                      </li>
                    </>
                  )}
                  {currentPlan === "Professional" && (
                    <>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Unlimited active projects
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Invite up to 50 team members
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Task automation & reminders
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Priority email support
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Advanced reporting
                      </li>
                    </>
                  )}
                  {currentPlan === "Enterprise" && (
                    <>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Unlimited everything
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Custom reports
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Slack integration
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Trello integration
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Priority support
                      </li>
                    </>
                  )}
                </ul>
              </div>
              
              <div className="space-y-4">
                <Button 
                  onClick={handleUpgradePlan} 
                  className="w-full md:w-auto"
                >
                  Upgrade Subscription
                </Button>
                
                {currentPlan !== "Free" && (
                  <Button 
                    variant="outline" 
                    className="w-full md:w-auto"
                  >
                    View Billing History
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account information and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="john.doe@example.com" type="email" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Your Company" />
                </div>
                <Button onClick={handleSaveAccountSettings}>
                  Update Account
                </Button>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 mb-6">
                  <Switch 
                    id="terms" 
                    checked={termsAgreed}
                    onCheckedChange={setTermsAgreed}
                  />
                  <div>
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link to="/terms-of-service" className="text-primary hover:underline" target="_blank">
                        Terms of Service
                      </Link>
                      {" "}and{" "}
                      <Link to="/privacy-policy" className="text-primary hover:underline" target="_blank">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Danger Zone
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Once you delete your account, there is no going back. This action cannot be undone.
                  </p>
                  <Button 
                    variant="destructive" 
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
