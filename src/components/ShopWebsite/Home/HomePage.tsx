"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/UI/Cards/Card";
import { getData } from "@/lib/request/resource/ShopRequest";
import { ICards } from "@/lib/request/resource/Cards/lib/ICardTypes";

const HomePage = () => {
  const [cards, setCards] = useState<ICards[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


    const [minPrice, setMinPrice] = useState<number | null>(null)
    const [maxPrice, setMaxPrice] = useState<number | null>(null)

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getData();
        if (Array.isArray(data)) {
          setCards(data);
        } else {
          setError("Invalid data format");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const minPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value ? parseFloat(e.target.value): null)
  }

  const maxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value ? parseFloat(e.target.value): null)
  }

  const filterCard = cards.filter((card) => {
    const isMinPrice = minPrice === null || card.price >= minPrice
    const isMaxPrice = maxPrice === null || card.price >= maxPrice
  })

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
          value={minPrice !== null ? minPrice : '10'}
        />
        <input
          type="number"
          placeholder="ДО"
          className="border border-solid border-teal-500 p-4"
          value={maxPrice !== null ? maxPrice : '20'}
        />
        <button className="border border-solid border-teal-500 p-4" onClick={() => setCards(filterCard)}>
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
