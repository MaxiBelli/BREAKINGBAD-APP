import React from "react";
import styles from "./styles/CardCharacter.module.css";

export default function Card({ name, img, nickname }) {
  return (
    <div className={styles.containerGlobalCard}>
      <h3>{name}</h3>
      <h4>"{nickname}"</h4>
      <img
        src={img}
        alt="Img Character Not Found"
        width="200em"
        height="250em"
      />
    </div>
  );
}
