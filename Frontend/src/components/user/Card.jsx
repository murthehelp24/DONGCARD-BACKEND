import { useState, useEffect } from 'react'
import axios from 'axios'

const Card = () => {
  const [cards, setCards] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [wishlist, setWishlist] = useState([]);
  const cardsPerPage = 20;

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:8888/api/cards')
        setCards(response.data.cards)
      } catch (err) {
        console.error("Error fetching data:", err)
      }
    };
    fetchCards();
  }, []);

  const toggleWishlist = (id) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredCards = cards.filter((card) => card.name.includes("Nami"))

  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard)

  const totalPages = Math.ceil(filteredCards.length / cardsPerPage)

  return (
    <div className="p-6 bg-[#1a1c23] min-h-screen flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 flex-grow">
        {currentCards.map((card) => (
          <div key={card.id} className="group flex bg-[#23262f] border border-gray-700/50 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-xl">

            <div className="relative w-[45%] bg-black/20 p-2 flex items-center justify-center overflow-hidden">

              {/* ปุ่ม Wishlist */}
              <button
                onClick={() => toggleWishlist(card.id)}
                className="absolute top-2 left-2 z-10 p-1.5 rounded-full bg-black/40 hover:bg-black/60 transition-colors group/heart"
              >
                <svg
                  xmlns="http://www.w3.org"
                  className={`h-5 w-5 transition-transform active:scale-125 ${wishlist.includes(card.id) ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-white'}`}
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>

              <img
                src={`https://wsrv.nl/?url=${card.image}`}
                alt={card.name}
                className="w-full h-auto object-contain rounded shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="w-[55%] p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold text-white truncate border-b border-primary/30 pb-1 mb-2">{card.name}</h2>
                <div className="space-y-1 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                  <p className="text-gray-500">{card.id} : <span>{card.color}</span></p>
                  <p className="badge badge-ghost badge-sm rounded-sm">{card.rarity}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="mb-2">
                  <span className="text-xs text-gray-500 block uppercase">Price</span>
                  <span className="text-xl font-black text-white">${card.price}</span>
                </div>
                <button className="btn btn-primary btn-sm w-full no-animation hover:scale-[1.02] active:scale-95 text-xs tracking-tighter">ADD TO CART</button>
              </div>
            </div>

          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10 mb-6">
        <div className="join border border-gray-700">
          <button
            className={`join-item btn btn-sm ${currentPage === 1 ? 'btn-disabled' : ''}`}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            «
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`join-item btn btn-sm ${currentPage === index + 1 ? 'btn-primary' : ''}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`join-item btn btn-sm ${currentPage === totalPages ? 'btn-disabled' : ''}`}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            »
          </button>

        </div>
      </div>
    </div>
  );
};

export default Card
