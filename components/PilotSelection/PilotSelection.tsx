import React, { useState } from "react";
import styles from "./PilotSelection.module.css";

type SelectionOption = {
  id: string;
  name: string;
  icon: string; // This would be the path to the icon image
};

const avatars: SelectionOption[] = [
  { id: "frog", name: "Frog", icon: "🐸" },
  { id: "dog", name: "Dog", icon: "🐶" },
  { id: "cat", name: "Cat", icon: "🐱" },
  { id: "hippo", name: "Hippo", icon: "🦛" },
];

const PilotSelection: React.FC = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const renderSelectionOptions = (
    options: SelectionOption[],
    selectedOption: string | null,
    onSelect: (id: string) => void
  ) => {
    return options.map((option) => (
      <button
        key={option.id}
        className={`${styles.selectionButton} ${
          selectedOption === option.id ? styles.selected : ""
        }`}
        onClick={() => onSelect(option.id)}
      >
        <span className={styles.icon}>{option.icon}</span>
        <span className={styles.name}>{option.name}</span>
      </button>
    ));
  };

  return (
    <div className={styles.gameSelection}>
      <div className={styles.selectionSection}>
        <h3>Choose Avatar:</h3>
        <div className={styles.optionsGrid}>
          {renderSelectionOptions(avatars, selectedAvatar, setSelectedAvatar)}
        </div>
      </div>
    </div>
  );
};

export default PilotSelection;
