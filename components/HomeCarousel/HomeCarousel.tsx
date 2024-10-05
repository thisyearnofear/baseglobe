import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "../UI/carousel";
import CarouselCard from "../Card/CarouselCard";
import { BaseGlobeCard } from "./BaseGlobeCard";
import PilotSelectionCard from "../PilotSelection/PilotSelection";
import AircraftSelectionCard from "../AircraftSelection/AircraftSelection";
import styles from "./HomeCarousel.module.css";
import { useMint } from "../../src/hooks/useMint";

interface HomeCarouselProps {
  isConnected: boolean;
  mintProps: ReturnType<typeof useMint>;
}

export const HomeCarousel: React.FC<HomeCarouselProps> = ({
  isConnected,
  mintProps,
}) => {
  const cards = [
    {
      title: "Base Globe",
      content: (
        <BaseGlobeCard isConnected={isConnected} mintProps={mintProps} />
      ),
    },
    {
      title: "Select Pilot",
      content: <PilotSelectionCard />,
    },
    {
      title: "Select Craft",
      content: <AircraftSelectionCard />,
    },
  ];

  return (
    <Carousel className={styles.carousel}>
      <CarouselContent className={styles.carouselContent}>
        {cards.map((card, index) => (
          <CarouselCard key={index} title={card.title} content={card.content} />
        ))}
      </CarouselContent>
      <div className={styles.carouselControls}>
        <CarouselPrevious className={styles.carouselButton} />
        <CarouselNext className={styles.carouselButton} />
      </div>
    </Carousel>
  );
};
