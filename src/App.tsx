import { useState } from 'react'
import './App.css'

interface Card {
  id: number;
  title: string;
  image: string;
}

function App() {
  const [cards] = useState<Card[]>([
    {
      id: 1,
      title: "Majestic Lion",
      image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=300&h=300&fit=crop&crop=faces"
    },
    {
      id: 2,
      title: "Ocean Wave",
      image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=300&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Mountain Peak",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Forest Path",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop"
    },
    {
      id: 5,
      title: "City Lights",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Desert Sunset",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=300&fit=crop"
    },
    {
      id: 7,
      title: "Butterfly Garden",
      image: "https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=300&h=300&fit=crop"
    },
    {
      id: 8,
      title: "Space Nebula",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=300&fit=crop"
    },
    {
      id: 9,
      title: "Cherry Blossoms",
      image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=300&h=300&fit=crop"
    },
    {
      id: 10,
      title: "Arctic Aurora",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=300&h=300&fit=crop"
    },
    {
      id: 11,
      title: "Tropical Beach",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop"
    },
    {
      id: 12,
      title: "Golden Wheat",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=300&h=300&fit=crop"
    }
  ]);

  return (
    <>
      <h1>Memory Card Game</h1>
      <div className="cards-container">
        {cards.map((card) => (
          <div key={card.id} className="memory-card">
            <img src={card.image} alt={card.title} />
            <h3>{card.title}</h3>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
