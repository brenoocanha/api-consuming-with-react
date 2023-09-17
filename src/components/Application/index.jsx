import { CardCharacter } from "../CardCharacter";
import { ContainerApp, ContentCharacters, HeaderApp, Loader } from "./styles";
import { useEffect, useState } from "react";
import axios from "axios";

import IconLoader from "../../assets/loader.gif";

export function Application() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [countPages, setCountPages] = useState("");
  const [qtdCharacters, setQtdCharacters] = useState("");
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((response) => {
        const array = [...characters, ...response.data.results];
        setCharacters(array);
        setCountPages(response.data.info.pages);
        setQtdCharacters(response.data.info.count);
        setIsLoader(false);
      });
  }, [page]);

  return (
    <>
      {isLoader && (
        <Loader>
          <img src={IconLoader} alt="Spinner" />
        </Loader>
      )}
      <ContainerApp>
        <HeaderApp>
          <h1>Rick and Morty</h1>
          <span>Nº de Personagens: {qtdCharacters}</span>
        </HeaderApp>
        <ContentCharacters>
          <div>
            {characters &&
              characters.map(({ image, name, species, gender, id }) => {
                return (
                  <CardCharacter
                    image={image}
                    name={name}
                    gender={gender}
                    species={species}
                    key={id}
                  />
                );
              })}
          </div>
          {!(page === countPages) && (
            <button onClick={() => setPage(page + 1)}>Carregar mais</button>
          )}
        </ContentCharacters>
      </ContainerApp>
    </>
  );
}
