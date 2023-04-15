import React, { useState, useEffect, useRef } from 'react';
import './NewsTicker.css';

const newsItems = [
  { id: 1, text: 'Bullish-Rated BOMB (BOMB) Rises Friday' },
  { id: 2, text: 'Shiba Inu (SHIB) Looks Positive' },
  { id: 3, text: 'Bitcoin (BTC) reaches $23000' },
  { id: 4, text: 'More people are seeking crypto education' },
  { id: 5, text: 'Crypto and blockchain education becomes priority at top universities' },
];

const NewsTicker = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [scrollPos, setScrollPos] = useState(0);
  const tickerRef = useRef();

  useEffect(() => {
    // Start the animation loop
    const animate = () => {
      setScrollPos((prevScrollPos) => {
        const newScrollPos = prevScrollPos + 0.01;
        if (newScrollPos >= newsItems.length * 30) {
          return 0;
        }
        return newScrollPos;
      });
      tickerRef.current = requestAnimationFrame(animate);
    };
    tickerRef.current = requestAnimationFrame(animate);

    // Clean up the animation frame when the component unmounts
    return () => {
      cancelAnimationFrame(tickerRef.current);
    };
  }, []);

  useEffect(() => {
    // Calculate which news items should be visible based on the scroll position
    const newVisibleItems = newsItems.filter((item) => item.id * 30 > scrollPos && item.id * 30 < scrollPos + 800);

    // If the visible items have changed, update the state
    if (JSON.stringify(newVisibleItems) !== JSON.stringify(visibleItems)) {
      setVisibleItems(newVisibleItems);
    }
  }, [scrollPos, visibleItems]);

  return (
    <div className="news-ticker">
      <ul style={{ top: `-${scrollPos}px` }}>
        {visibleItems.map((item) => (
          <li key={item.id} style={{ top: `${item.id * 30}px`, fontSize: '24px' }}>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsTicker;
