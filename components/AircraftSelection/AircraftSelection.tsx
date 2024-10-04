import React, { useState } from "react";
import styles from "./AircraftSelection.module.css";

type SelectionOption = {
  id: string;
  name: string;
  icon: string; // This would be the path to the icon image
};

const aircraft: SelectionOption[] = [
  { id: "blimp", name: "Blimp", icon: "🎈" },
  { id: "balloon", name: "Hot Air Balloon", icon: "🔥🎈" },
  { id: "propeller", name: "Propeller Plane", icon: "✈️" },
];

const AircraftSelection: React.FC = () => {
  const [selectedAircraft, setSelectedAircraft] = useState<string | null>(null);

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
        <h3>Choose Aircraft:</h3>
        <div className={styles.optionsGrid}>
          {renderSelectionOptions(
            aircraft,
            selectedAircraft,
            setSelectedAircraft
          )}
        </div>
      </div>
    </div>
  );
};

export default AircraftSelection;
