import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import BackToSearchButton from './BackToSearchButton';


/**
 * A simple "About" page component.
 */
function AboutPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="mb-4 text-center">{t("about_title")}</h1>
      <p>
        {t("about1")}
      </p>
      <p>
        {t("about2")}
      </p>
      <BackToSearchButton />
    </div>
  );
}

export default AboutPage;

