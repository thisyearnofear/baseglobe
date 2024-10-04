import React from "react";
import { Card, CardContent } from "../../components/UI/card";
import styles from "../../src/styles/home.module.css";

interface CarouselCardProps {
  title: string;
  content: React.ReactNode;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ title, content }) => {
  return (
    <div className={styles.carouselItem}>
      <Card className={styles.card}>
        <CardContent>
          <h2 className={styles.cardTitle}>{title}</h2>
          {content}
        </CardContent>
      </Card>
    </div>
  );
};

export default CarouselCard;
