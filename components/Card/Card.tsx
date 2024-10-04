import React, { ReactNode } from "react";
import styles from "./Card.module.css"; // Create a CSS module for styling

interface CardProps {
  children: ReactNode; // Define the type for children
  className?: string; // Optional className prop
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
};

export default Card;
