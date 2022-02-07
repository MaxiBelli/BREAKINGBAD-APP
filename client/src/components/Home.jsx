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
} from "../actions";
import Card from "./Card";
import Paged from "./Paged";
import SearchBar from "./SearchBar";

//COMIENZA EL COMPONENTE
export default function Home() {
  const dispatch = useDispatch();
  const allCharacters = useSelector((state) => state.characters); //hooks...esta linea es lo mismo q hacer mapstatetoprops
  // con useselector traeme en esa const todo lo q esta en el estado de characters

  //OREDENAMIENTO
  const [orden, setOrden] = useState("");

  //PAGINADO
  const [currentPage, setCurrentPage] = useState(1); //pag actual y una q me la setea.(1) xq arranca en la primer pag
  const [charactesPerPage, setcharactesPerPage] = useState(6); //personajes x pagina.(6)xq va a haber 6 personajes x pagina
  const indexOfLastCharacter = currentPage * charactesPerPage; // ind ultimo char = pag actual * char x pag (6)
  const indexOfFirtsCharacter = indexOfLastCharacter - charactesPerPage; //ind 1° char = ultimo - char x pag
  const currentCharacters = allCharacters.slice(
    indexOfFirtsCharacter,
    indexOfLastCharacter
  ); //personajes a renderizar dependiendo de la pag

  const page = (pageNumber) => {
    //es la q me a ayudar al renderizado
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    //va a cumplir las veces del componentDidMount al momento de montarse el componente
    //me va llenando el estado cdo se monta el componente
    dispatch(getCharacters()); ////con el useEffect reemplazo la lógica del mapDispatchToProps
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
      <Link to="/character">Crear Personaje </Link>
      <h1>AGUANTE BREAKING BAD</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar todos los personajes
      </button>
      <div>
        <select onChange={(e) => handleSort(e)}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select onChange={(e) => handleFilterStatus(e)}>
          <option value="All">Todos</option>
          <option value="Alive">Vivo</option>
          <option value="Deceased">Muerto</option>
          <option value="Unknown">Desconocido</option>
          <option value="Presumed dead">Probablemente muerto</option>
        </select>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="All">Todos</option>
          <option value="created">Creados</option>
          <option value="api">Existente</option>
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
