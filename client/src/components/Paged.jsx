import React from "react";

export default function Paged({ charactersPerPage, allCharacters, page }) {
  //me las traigo como props del otro comp
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(allCharacters / charactersPerPage); i++) {
    //cada una de las paginas q necesito para renderizar los personajes
    pageNumbers.push(i + 1); //para q el paginado arranque en 1
  }

  return (
    <nav>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li>
              <a onClick={() => page(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
