import React, { useEffect, useRef } from "react";
import { initGame, cleanupGame } from "./GameEngine";

const Game: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && isVisible) {
      initGame(canvasRef.current);
    }

    return () => {
      if (isVisible) {
        cleanupGame();
      }
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: isVisible ? 1 : -1,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
      }}
    />
  );
};

export default Game;
