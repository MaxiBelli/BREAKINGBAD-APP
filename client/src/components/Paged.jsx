import React from "react";
import styles from './styles/Paged.module.css'

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
            <li className={styles.liPaged} key={number}>
              <button onClick={() => page(number)} className={styles.btnPaged} >{number}</button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
