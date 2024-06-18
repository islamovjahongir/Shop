"use client"
import React from 'react';
import { ICardProps } from './lib/ICardTypes';

const Card = ({ card }: ICardProps) => {
  return (
    <div className='mt-8'>
      <div key={card.id} className='flex items-center gap-6 border border-slate-300 rounded-3xl p-6'>
        <img width={100} height={200} src={card.image} alt={card.title} />
        <div>
          <p>Title: {card.title}</p>
          <p>Description: {card.description}</p>
          <p>Category: {card.category}</p>
          <p>Price: {card.price}</p>
          <p>Rating: {card.rating.rate} ({card.rating.count} reviews)</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
