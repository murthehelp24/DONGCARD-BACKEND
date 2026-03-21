import { useState, useEffect } from 'react';
import axios from 'axios';

const Card = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:8888/api/cards');
        setCards(response.data.cards); // เอาข้อมูลที่ได้ใส่ลงใน state
        console.log(response.data.cards)
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchCards();
  }, []);
  return (
    <>
      <div className="p-6 bg-[#1a1c23] min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cards
            .filter((card) => card.name.includes("Zoro"))
            .map((card) => (
              <div
                key={card.id}
                className="group flex bg-[#23262f] border border-gray-700/50 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-xl"
              >
                <div className="w-[45%] bg-black/20 p-2 flex items-center justify-center">
                  <img
                    src={`https://wsrv.nl/?url=${card.image}`}
                    alt={card.name}
                    className="w-full h-auto object-contain rounded shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="w-[55%] p-4 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white truncate border-b border-primary/30 pb-1 mb-2">
                      {card.name}
                    </h2>
                    <div className="space-y-1 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                      <p className="text-gray-500">{card.id}</p>
                      <p className="badge badge-ghost badge-xs rounded-sm">{card.rarity}</p>
                      <p className="mt-2 text-white/90">Power: <span className="text-primary">{card.power}</span></p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="mb-3">
                      <span className="text-xs text-gray-500 block uppercase">Price</span>
                      <span className="text-xl font-black text-white">${card.price}</span>
                    </div>

                    <button className="btn btn-primary btn-sm w-full no-animation hover:scale-[1.02] active:scale-95 text-xs tracking-tighter">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>


    </>
  )
}

export default Card