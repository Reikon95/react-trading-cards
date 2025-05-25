import { TradingCard } from "./TradingCard";
import styles from "./TradingCardStack.module.css";
import { useState, useEffect, useRef } from "react";

export function TradingCardStack() {
  const [cards, setCards] = useState([
    {
      image: "/path-to-image",
      name: "Coding Cam",
      facts: [
        "Full stack, product focused developer",
        "Has built multiple SaaS products",
        "Full time roles at startups and corporates",
      ],
      stats: [
        { label: "Years Experience", value: "6+" },
        {
          label: "Typescript/React Knowledge",
          value: "Expert",
        },
      ],
    },
    {
      image: "/path-to-image",
      name: "Content & Advocacy Cam",
      facts: [
        "Worked with top developer tool companies on video content",
        "Led multiple live technical talks",
        "Former podcast host with 80+ episodes",
      ],
      stats: [
        { label: "Views in Past 12 Months", value: "600,000+" },
        { label: "Followers on TikTok", value: "7,000+" },
      ],
    },
    {
      image: "/path-to-image",
      name: "Rugby Cam",
      facts: [
        "Not just a coder, but a rugby player!",
        "Player for Edinburgh Northern RFC",
        "Manages the club website. Can't escape coding!",
      ],
      stats: [
        { label: "Tries (2024-25)", value: "3" },
        { label: "Appearances (2024-25)", value: "14" },
      ],
    },
  ]);

  const [showIndicator, setShowIndicator] = useState(true);

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

  // Touch event handlers for swipe
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
        <div className={styles.navigationIndicator}>
          ← Swipe or use arrow keys →
        </div>
      )}
    </div>
  );
}
