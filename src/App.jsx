/*
**Setup Instructions for this React App:**

1.  **Install Dependencies:**
    In your React project terminal, run:
    npm install react-bootstrap bootstrap react-router-dom react-i18next i18next

*/

import React from 'react';

import {
  BrowserRouter, 
  Routes,      
  Route      
} from 'react-router-dom';

import { Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { changeLanguage } from "i18next";

import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';


import LandingPage from './components/LandingPage';
import SearchPage from './components/SearchPage';
import AboutPage from './components/AboutPage';
import GameDetail from './components/GameDetail';

import 'bootstrap/dist/css/bootstrap.min.css';


// function changeLanguage(lang) {
  // Placeholder function for language change
//  console.log("Language changed to: " + lang);
//}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "Welcome to React": "Welcome to React and react-i18next",
          "back to search" : "← Back to Search",
          "Search" : "Search",
          "title" : "Title",
          "developer" : "Developer",
          "publisher" : "Publisher",
          "language" : "Language",
          "Start" : "Start!",
          "Search for a video game..." : "Search for a video game...",
          "game deals" : "Please enter a search term to find game deals.",
          "about1" : "This application is a simple demonstration of how to use the NEXARDA API to search for video game prices. It is built with React, React-Bootstrap, and React Router.",
          "about2" : "The NEXARDA API provides a free-to-use service for comparing video game deals from various retailers.",
          "more info" : "More info",
          "short_desc" : "Description",
          "more info on nexarda" : "View on Nexarda.com",
          "welcome" : "Welcome to NEXARDA React",
	  "search_title": "NEXARDA Game Price Search",
          "searching": "Searching...",
          "error_label": "Error: ",
          "fetch_error": "Failed to fetch data. Please try again.",
          "no_results": "No results found.",
          "about_title": "About This App",
          "unknown_title": "Unknown Title",
          "price_unavailable": "Price not available",
          "starts_at": "Starts at",
          "not_found": "Not found.",
	  "loading": "Loading...",
	  "api_no_results_for": "Sorry, we couldn't find any results for '{{term}}'."
        }
      },
      es: {
        translation: {
          "Welcome to React": "Bienvenido a React y react-i18next",
          "back to search" : "← Volver a la búsqueda",
          "Search" : "Buscar",
          "title" : "Título",
          "developer" : "Desarrollador",
          "publisher" : "Editor",
          "language" : "Idioma",
          "Start" : "¡Comenzar!",
          "Search for a video game..." : "Buscar un videojuego...",
          "game deals" : "Por favor, ingrese un término de búsqueda para encontrar ofertas de juegos.",
          "about1" : "Esta aplicación es una demostración sencilla de cómo utilizar la API de NEXARDA para buscar precios de videojuegos. Está desarrollada con React, React-Bootstrap y React Router.",
          "about2" : "La API NEXARDA ofrece un servicio gratuito para comparar ofertas de videojuegos de distintos minoristas.",
          "more info" : "Más información",
          "short_desc" : "Descripción",
          "more info on nexarda" : "Ver en Nexarda.com",
          "welcome" : "Bienvenido a NEXARDA React",
	  "search_title": "Búsqueda de precios de juegos NEXARDA",
          "searching": "Buscando...",
          "error_label": "Error: ",
          "fetch_error": "Error al obtener datos. Por favor, inténtelo de nuevo.",
          "no_results": "No se encontraron resultados.",
          "about_title": "Acerca de esta aplicación",
          "unknown_title": "Título desconocido",
          "price_unavailable": "Precio no disponible",
          "starts_at": "Desde",
          "not_found": "No encontrado.",
	  "loading": "Cargando...",
	  "api_no_results_for": "Lo sentimos, no pudimos encontrar ningún resultado para '{{term}}'."
        }
      },
      fi: {
        translation: {
          "Welcome to React": "Tervetuloa Reactiin ja react-i18nextiin",
          "back to search" : "← Takaisin hakuun",
          "Search" : "Hae",
          "title" : "Nimi",
          "developer" : "Kehittäjä",
          "publisher" : "Julkaisija",
          "language" : "Kieli",
          "Start" : "Aloita!",
          "Search for a video game..." : "Etsi videopeliä...",
          "game deals" : "Anna hakusana löytääksesi pelitarjoukset.",
          "about1" : "Tämä sovellus on yksinkertainen esimerkki siitä, kuinka NEXARDA-sovellusliittymää voidaan käyttää videopelien hintojen hakemiseen. Se on rakennettu React-, React-Bootstrap- ja React Router -sovelluksilla.",
          "about2" : "NEXARDA API tarjoaa ilmaisen palvelun, jolla voi vertailla eri jälleenmyyjien videopelitarjouksia.",
          "more info" : "Lisätietoja",
          "short_desc" : "Kuvaus",
          "more info on nexarda" : "Katso Nexarda.com:issa",
          "welcome" : "Tervetuloa NEXARDA Reactiin",
	  "search_title": "NEXARDA Pelien hinta haku",
          "searching": "Etsitään...",
          "error_label": "Virhe: ",
          "fetch_error": "Tietojen hakeminen epäonnistui. Yritä uudelleen.",
          "no_results": "Ei tuloksia.",
          "about_title": "Tietoja tästä sovelluksesta",
          "unknown_title": "Tuntematon nimi",
          "price_unavailable": "Hintaa ei saatavilla",
          "starts_at": "Alkaen",
          "not_found": "Ei löytynyt.",
	  "loading": "Ladataan...",
	  "api_no_results_for": "Valitettavasti emme löytäneet tuloksia haulla '{{term}}'."
        }
      }

    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });


/**
 * Main application component that sets up routing.
 */
function App() {
  const { t } = useTranslation();
  return (
    <BrowserRouter>

      <Navbar expand="lg" bg="warning">
        <Container fluid>
          <NavbarBrand>
            <Link to={`/about/`}>
              <Button variant="outline-primary">i</Button>
            </Link>
            Nexarda
          </NavbarBrand>
          <DropdownButton drop="start" variant="warning" title={t("language")} id="basic-nav-dropdown" onSelect={(val)=>changeLanguage(val)}>
            <Dropdown.Item eventKey="en">English</Dropdown.Item>
            <Dropdown.Item eventKey="es">Español</Dropdown.Item>
            <Dropdown.Item eventKey="fi">Suomi</Dropdown.Item>
          </DropdownButton>
        </Container>
      </Navbar>

      <Container className="my-5 p-4 rounded-3 shadow-sm" style={{ maxWidth: '800px', minHeight: '350px' }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/game/:gameId" element={<GameDetail />} />
            
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
