import { useState, useEffect } from "react";
import { Form, Button, InputGroup, Spinner, Alert, Card, Row, Col, Badge } from "react-bootstrap";
import { GameCard } from "./GameCard.jsx";
import { useTranslation } from "react-i18next";

/**
 * The main search page component.
 * This was formerly the `App` component.
 */
function SearchPage() {

  const { t } = useTranslation();

  // Initialize state from sessionStorage (or use defaults if nothing is saved yet)
  const [searchTerm, setSearchTerm] = useState(() => sessionStorage.getItem('searchTerm') || '');
  const [lastSearched, setLastSearched] = useState(() => sessionStorage.getItem('lastSearched') || ''); 
  const [results, setResults] = useState(() => {   
    const savedResults = sessionStorage.getItem('searchResults');
    // We have to parse the results back into an array/object from a string
    return savedResults ? JSON.parse(savedResults) : [];
  });

  // State to show a loading spinner
  const [loading, setLoading] = useState(false);
  // State to hold any error messages
  const [error, setError] = useState(null);

  // Save to sessionStorage whenever these states change
  useEffect(() => {
    sessionStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    sessionStorage.setItem('lastSearched', lastSearched);
  }, [lastSearched]);

  useEffect(() => {
    // We have to turn the results array into a string to save it
    sessionStorage.setItem('searchResults', JSON.stringify(results));
  }, [results]);

  /**
   * Handles the search form submission.
   * @param {React.FormEvent} event - The form submission event.
   */
  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) return; // Don't search for empty strings

    setLoading(true);
    setError(null);
    setResults([]);

    // Lock in the search term that we are actually querying
    setLastSearched(searchTerm);

    // Construct the API URL for the NEXARDA search endpoint
    const apiUrl = `https://www.nexarda.com/api/v3/search?type=games&q=${encodeURIComponent(searchTerm)}`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();


      // The NEXARDA API documentation isn't explicit on the v3 search response structure.
      // But 'data.results.items' is the array of games.
      
      if (data.results)
      {  
        if (Array.isArray(data.results.items)) {
          setResults(data.results.items);
        } else {
          // Handle cases where data is not an array (e.g., empty result or different structure)
          setResults([]);
          if (data.results.items && data.results.items.message) {
            setError(data.results.items.message);
          } 
        }
      } else {
        // Sorry we couldn't find any results for...
        setResults([]);
        // Store the raw API message in state instead of translating it here
        setError(data.message);      
      }
    } catch (err) {
      console.error("Fetch error:", err);
      // Store a specific "key" in state so we know to translate it later
      setError('fetch_error');
    } finally {
      setLoading(false);
    }
  };

  return (
    // We remove the Container wrapper, as this will be handled by the main App component
    <>
      <h1 className="mb-4 text-center" style={{ minHeight: '3em' }}>{t("search_title")}</h1>
      
{/* Search Form */}
              <Form onSubmit={handleSearch}>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder={t("Search for a video game...")}
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setError(null); 
                    }}
                    aria-label="Search for a video game"
                    style={{ minWidth: 0 }} 
                  />
                  <Button variant="primary" type="submit" disabled={loading} style={{ minWidth: '74px' }}>
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span className="visually-hidden">{t("loading")}</span>
                      </>
                    ) : (
                      t("Search")
                    )}
                  </Button>
                </InputGroup>
              </Form>

      {/* Results Section */}
      <div className="mt-4">
        {/* Loading State */}
        {loading && (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">{t("searching")}</p>
          </div>
        )}

	{/* Now, error is holding either the raw string "Sorry, we couldn't find any results for..." or "fetch_error". 
   // When the component renders the <Alert>, it checks what kind of error it is and passes it through 
   // the t() function dynamically. When you click the dropdown to change the language, 
   // this block re-runs immediately, giving you the correct localized text! */}
	{/* Error State */}
        {error && (
          <Alert variant="danger">
            <strong>{t("error_label")}</strong> 
            {error === 'fetch_error' 
              ? t("fetch_error") 
              : error.includes("Sorry, we couldn't find any results for")
                ? t("api_no_results_for", { term: lastSearched })
                : error}
          </Alert>
        )}

        {/* Results List (Grid) */}
        {!loading && !error && results.length > 0 && (
          <Row className="g-4">
            {results.map((game, index) => (
              <GameCard game={game} key={game.id || index} />
            ))}
          </Row>
        )}

        {/* No Results State */}
        {!loading && !error && results.length === 0 && !loading && (
          <p className="text-center text-muted">
            {searchTerm ? t("no_results") : t("game deals")}
          </p>
        )}
      </div>
    </>
  );
}

export default SearchPage;

