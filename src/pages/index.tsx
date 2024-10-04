import React, { useState } from "react";
import type { NextPage } from "next";
import { HomeLayout } from "../../components/Layout/HomeLayout";
import { HomeCarousel } from "../../components/HomeCarousel/HomeCarousel";
import GameComponent from "../../components/Game/GameComponent";
import { useWallet } from "../hooks/useWallet";
import { useMint } from "../hooks/useMint";

const Home: NextPage = () => {
  const { isConnected } = useWallet();
  const mintProps = useMint();
  const [showGame, setShowGame] = useState(false);

  const toggleView = () => {
    setShowGame(!showGame);
  };

  return (
    <HomeLayout>
      <button
        onClick={toggleView}
        style={{ position: "fixed", top: 10, right: 10, zIndex: 1000 }}
      >
        {showGame ? "Show Carousel" : "Show Game"}
      </button>
      {showGame ? (
        <GameComponent />
      ) : (
        <HomeCarousel isConnected={isConnected} mintProps={mintProps} />
      )}
    </HomeLayout>
  );
};

export default Home;
