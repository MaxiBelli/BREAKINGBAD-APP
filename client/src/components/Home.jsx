import React from "react";
import { Link } from "react-router-dom";
//importo los hooks q voy a usar de react
import { useState, useEffect } from "react";
//importo los hooks q voy a usar de react-redux(los instalo)
import { useDispatch, useSelector } from "react-redux";
//importo las actions que me interesa usar en este componente
import {
  getCharacters,
  filterCharactersByStatus,
  filterCreated,
  orderByName,
} from "../redux/actions";
import Card from "./Card";
import Paged from "./Paged";
import SearchBar from "./SearchBar";

//COMIENZA EL COMPONENTE
export default function Home() {
  const dispatch = useDispatch();
  const allCharacters = useSelector((state) => state.characters);

  //OREDENAMIENTO
  const [orden, setOrden] = useState("");

  //PAGINADO
  const [currentPage, setCurrentPage] = useState(1);
  const [charactesPerPage, setcharactesPerPage] = useState(6);
  const indexOfLastCharacter = currentPage * charactesPerPage;
  const indexOfFirtsCharacter = indexOfLastCharacter - charactesPerPage;
  const currentCharacters = allCharacters.slice(
    indexOfFirtsCharacter,
    indexOfLastCharacter
  );

  const page = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch]); //

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCharacters());
  }

  //FILTRADOS X STATUS
  function handleFilterStatus(e) {
    dispatch(filterCharactersByStatus(e.target.value));
  }

  //FILTRADOS X CREADOS O EXISTENTES
  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  //ORDENAMIENTO X NOMBRE ASC Y DES
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1); //cuando seteo esta pag
    setOrden(`Ordenado ${e.target.value}`); //me modifique el estado local y se renderize
  }

  return (
    <div>
      <Link to="/character">Create Character </Link>
      <h1>BREAKING BAD APP</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload all characters
      </button>
      <div>
        <select onChange={(e) => handleSort(e)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <select onChange={(e) => handleFilterStatus(e)}>
          <option value="All">All</option>
          <option value="Alive">Alive</option>
          <option value="Deceased">Deceased</option>
          <option value="Unknown">Unknown</option>
          <option value="Presumed dead">Presumed dead</option>
        </select>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="All">All</option>
          <option value="created">Created</option>
          <option value="api">Existing</option>
        </select>
        <Paged
          charactersPerPage={charactesPerPage}
          allCharacters={allCharacters.length}
          page={page}
        />
        <SearchBar />
        {currentCharacters &&
          currentCharacters.map((c) => {
            //allCharacters.map?
            return (
              <div>
                <Link to={"/details/" + c.id}>
                  <Card
                    name={c.name}
                    img={c.img}
                    nickname={c.nickname}
                    key={c.id}
                  />
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

//c.img? c.img : <img src="url..."/> //para poner una imgen por default
