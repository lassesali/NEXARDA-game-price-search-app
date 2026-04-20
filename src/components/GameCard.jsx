import { Card, Button, Badge, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

/**
 * Renders a single search result item in a grid.
 * @param {object} props - The component props.
 * @param {object} props.game - The game data object from the API.
 */
export function GameCard({ game }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // We guess at common fields. You may need to inspect the API
  // response to find the correct field names (e.g., game.title, game.link, game.platforms)
  const gameName = game.name || game.title || t("unknown title");
  
  // Use a placeholder image, checking for API-provided image first
  const imageUrl = game.image || game.thumbnail || `https://placehold.co/600x400/343a40/ffffff?text=${encodeURIComponent(gameName)}`;

  // Attempt to find a price, which is common for this API
  let priceInfo = t("price_unavailable");
  if (game.game_info?.price) {
    priceInfo = `€${game.game_info.price}`;
  } else if (game.game_info?.lowest_price) {
    priceInfo = `${t("starts_at")} €${game.game_info.lowest_price}`;
  }

    // Attempt to find platform info
    let platform = null;
    if (game.game_info?.platforms && Array.isArray(game.game_info?.platforms)) {
      // Check if the first element is an object with a 'name' property
      if (game.game_info?.platforms.length > 0 && typeof game.game_info?.platforms[0] === 'object' && game.game_info?.platforms[0] !== null && 'name' in game.game_info?.platforms[0]) {
        platform = game.game_info?.platforms.map(p => p.name).join(', ');
      } else if (game.game_info?.platforms.length > 0) {
        // Fallback for simple array of strings (original logic)
        platform = game.game_info?.platforms.join(', ');
      }
    } else if (game.game_info?.platform) {
      // Fallback for single platform property
      platform = game.game_info?.platform;
    }



  return (
    // Add responsive columns
    <Col xs={12} md={6} lg={4} className="mb-4 d-flex">
      <Card className="h-100 shadow-sm w-100 rounded-lg">
        <Card.Img
          variant="top"
          src={imageUrl}
          alt={`Cover art for ${gameName}`}
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/343a40/ffffff?text=${encodeURIComponent(gameName)}`; }}
          style={{ maxWidth: '200px', height: '180px', objectFit: 'cover', borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title style={{
            maxWidth: "190px"}} className="fw-bold fs-6 text-truncate">{gameName}</Card.Title>
          {platform && <Card.Text style={{
            maxWidth: "190px"}} className="text-muted small mb-2 text-truncate">{platform}</Card.Text>}
          <Badge bg="success" pill className="mb-3 align-self-start fs-6 px-3 py-2">
            {priceInfo}
          </Badge>
          
                <Link to={`/game/${game.game_info?.id}`}>
                  <Button variant="outline-primary">{t("more info")}</Button>
                </Link>

        </Card.Body>
      </Card>
    </Col>
  );
}