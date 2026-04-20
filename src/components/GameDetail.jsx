import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useTranslation } from "react-i18next";
import BackToSearchButton from './BackToSearchButton';


function GameDetail(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  let { gameId } = useParams(); 
  const [game, setGame] = useState(null);

  const getData = async () => {
    try {
        const res = await fetch("https://www.nexarda.com/api/v3/product?type=game&id="+gameId);
        const data = await res.json();
        setGame(data.product);
    } catch(e) {
        setGame(null);
    }  
  }
  
  useEffect(() => {
    getData();
  }, []);

  return (
    game ? 
    <>
      <img style={{maxWidth: '350px'}} src={game.images.cover} />
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{t("title")}</td>
          <td>{game.name}</td>

        </tr>
        <tr>
          <td>{t("developer")}</td>
          <td>{game.developers[0].name}</td>

        </tr>
        <tr>
          <td>{t("publisher")}</td>
          <td colSpan={2}>{game.publishers[0].name}</td>

        </tr>

        <tr>
          <td>{t("short_desc")}</td>
          <td>{game.short_desc}</td>

        </tr>



      </tbody>
    </Table>

    <Button
      variant="outline-primary"
      href={`https://www.nexarda.com${game.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-auto w-100"
    >
      {t("more info on nexarda")}
    </Button>
    

                  <BackToSearchButton />
    </>
    : <>{t("not_found")}
                  <BackToSearchButton />
    </>


  );
}

export default GameDetail;
