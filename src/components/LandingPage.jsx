import { Button, Row, Container } from "react-bootstrap";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

function LandingPage(props) {
  const { t } = useTranslation();
  return (
    <Container>
      <Row>    
        <h1>{t("welcome")}</h1>
        <Link to="/search"><Button style={{ minWidth: '107px' }}>{t("Start")}</Button></Link>
      </Row>
    </Container>
  );
}

export default LandingPage;
