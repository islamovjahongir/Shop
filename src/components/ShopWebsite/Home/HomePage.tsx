"use client"
import React, { useState, useEffect } from 'react';
import Card from '@/components/UI/Cards/Card';
import { getData } from '@/lib/request/resource/ShopRequest';
import { ICards } from '@/lib/request/resource/Cards/lib/ICardTypes';

const HomePage = () => {
  const [cards, setCards] = useState<ICards[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [filterCard, setFilterCard] = useState<ICards[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getData();
        if (Array.isArray(data)) {
          setCards(data);
        } else {
          setError('Invalid data format');
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(e.target.value));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(e.target.value));
  };

  const handleSearch = () => {
    const filtered = cards.filter(
      (card) => card.price >= (minPrice || 0) && card.price <= (maxPrice || Infinity)
    );
    setFilterCard(filtered); // Update the filterCard state with filtered results
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="shop_container">
      <div className="my-8 grid grid-cols-3 gap-4">
        <input
          type="number"
          placeholder="ОТ"
          className="border border-solid border-teal-500 p-4"
          value={minPrice !== null ? minPrice : ''}
          onChange={handleMinPriceChange}
        />
        <input
          type="number"
          placeholder="ДО"
          className="border border-solid border-teal-500 p-4"
          value={maxPrice !== null ? maxPrice : ''}
          onChange={handleMaxPriceChange}
        />
        <button className="border border-solid border-teal-500 p-4" onClick={handleSearch}>
          Найти
        </button>
      </div>

      {filterCard.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default HomePage;
