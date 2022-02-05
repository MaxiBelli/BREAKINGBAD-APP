import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../actions";
import Card from "./Card";

//COMIENZA EL COMPONENTE
export default function Home() {
  const dispatch = useDispatch();
  const allCharacters = useSelector((state) => state.characters); //hooks...esta linea es lo mismo q hacer mapstatetoprops
  // con useselector traeme en esa const todo lo q esta en el estado de characters

  useEffect(() => {
    //va a cumplir las veces del componentDidMount al momento de montarse el componente
    //me va llenando el estado cdo se monta el componente
    dispatch(getCharacters()); ////con el useEffect reemplazo la lógica del mapDispatchToProps
  }, [dispatch]); //

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCharacters());
  }

  return (
    <div>
      <Link to="/character">Create Character </Link>
      <h1>BREAKING BAD</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload All Characters
      </button>
      <div>
        <select>
          <option value="asc">Ascendent</option>
          <option value="desc">Descendent</option>
        </select>
        <select>
          <option value="All">All</option>
          <option value="Alive">Alive</option>
          <option value="Deceased">Deceased</option>
          <option value="Unknown">nknown</option>
          <option value="Presumed dead">Presumed dead</option>
        </select>
        <select>
          <option value="All">All</option>
          <option value="created">Created</option>
          <option value="api">Existing</option>
        </select>

        {allCharacters &&
          allCharacters.map((c) => {
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
