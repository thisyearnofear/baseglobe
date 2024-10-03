import React from "react";
import styles from "./GameSelection.module.css";

const GameSelection: React.FC = () => {
  return (
    <div className={styles.gameSelection}>
      <h2 className={styles.heading}>Select Your Avatar</h2>
      {/* Add avatar selection logic here */}
      <h2 className={styles.heading}>Select Your Skin</h2>
      {/* Add skin selection logic here */}
      <button className="button" style={{ marginTop: 24 }}>
        Start Game
      </button>
    </div>
  );
};

export default GameSelection;
