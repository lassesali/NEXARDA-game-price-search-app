import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useTranslation } from "react-i18next"; 


function BackToSearchButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (

    <Button variant="secondary" className="mt-3" style={{ minWidth: '191px' }} onClick={() => navigate(-1)}>
      {t("back to search")}
    </Button>
)

}

export default BackToSearchButton;

