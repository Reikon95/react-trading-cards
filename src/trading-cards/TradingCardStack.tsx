import type { TradingCardProps } from "./TradingCard";
import { TradingCard } from "./TradingCard";
import styles from "./TradingCardStack.module.css";
import { useState, useEffect, useRef } from "react";

interface TradingCardStackProps {
  initiateWithIndicator?: boolean;
  indicatorText?: string;
  cardsToDisplay: TradingCardProps[];
}

export function TradingCardStack({
  initiateWithIndicator = true,
  indicatorText = "← Swipe or use arrow keys →",
  cardsToDisplay,
}: TradingCardStackProps) {
  const [cards, setCards] = useState(cardsToDisplay);

  const [showIndicator, setShowIndicator] = useState(initiateWithIndicator);

  const touchStartX = useRef<number | null>(null);

  const handleSwipeForward = () => {
    setShowIndicator(false);
    setCards((prevCards) => {
      const [firstCard, ...remainingCards] = prevCards;
      return [...remainingCards, firstCard];
    });
  };

  const handleSwipeBackward = () => {
    setShowIndicator(false);
    setCards((prevCards) => {
      const lastCard = prevCards[prevCards.length - 1];
      const remainingCards = prevCards.slice(0, -1);
      return [lastCard, ...remainingCards];
    });
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleSwipeForward();
      } else if (event.key === "ArrowLeft") {
        handleSwipeBackward();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartX.current;
    const threshold = 50; // px

    if (Math.abs(diffX) > threshold) {
      if (diffX < 0) {
        handleSwipeForward();
      } else {
        handleSwipeBackward();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div
      className={styles.cardStack}
      onClick={handleSwipeForward}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {cards.map((card, index) => (
        <div
          key={card.name}
          className={styles.cardWrapper}
          style={{
            transform: `rotate(${index * 10}deg)`,
            zIndex: cards.length - index,
            opacity: index === 0 ? 1 : 0.8,
          }}
        >
          <TradingCard {...card} />
        </div>
      ))}
      {showIndicator && (
        <div className={styles.navigationIndicator}>{indicatorText}</div>
      )}
    </div>
  );
}
