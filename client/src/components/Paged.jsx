import React from "react";

export default function Paged({ charactersPerPage, allCharacters, page }) {
  //me las traigo como props del otro comp
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCharacters / charactersPerPage); i++) {
    i < 10 ? pageNumbers.push("0" + i) : pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number}>
              <a onClick={() => page(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
