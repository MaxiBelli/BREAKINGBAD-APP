import React from "react";
import styles from "./styles/CardCharacter.module.css";

export default function Card({ name, img, nickname }) {
  return (
    <div className={styles.conteinerCharacter}>
      <img
        src={img}
        alt="Img Character Not Found"
        width="100%"
        height="100%"
      />
      <div className={styles.conteinerCharacterInfo}>
      <h1>{name}</h1>
      <h2>"{nickname}"</h2>
      </div>
    </div>
  );
}
