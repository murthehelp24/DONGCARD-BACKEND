import { useState, useEffect } from 'react'
import { useCart } from '../../utils/CartContext';
import mainApi from '../../api/mainApi';
import WishlistUser from './WishlistUser';
import Pagination from './Pagination';
import { Link } from 'react-router';

const Card = (props) => {
  const { filters } = props
  const { addToCart } = useCart()
  const [cards, setCards] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 20;


  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await mainApi.get('/cards')
        setCards(response.data.cards)
      } catch (err) {
        console.error("Error fetching data:", err)
      }
    };
    fetchCards();
  }, []);

  const filteredCards = cards.filter((card) => {
    const matchPrice = card.price <= filters.price

    const matchRarity = filters.rarity.length === 0 || filters.rarity.includes(card.rarity);
    const matchColor = filters.color.length === 0 || filters.color.includes(card.color);
    return matchPrice && matchRarity && matchColor;
  })

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage)

  return (
    <div className="p-6 bg-base-200 min-h-screen flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentCards.map((card) => (
          <div key={card.id} className=" group flex bg-[#23262f] border border-gray-700/50 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-xl">

            <div className="relative w-[45%] bg-black/20 p-2 flex items-center justify-center overflow-hidden">

              <WishlistUser card={card} />

              <Link to={`/card/${card.id}`} >
                <img
                  src={`https://wsrv.nl/?url=${card.image}`}
                  alt={card.name}
                  className="w-full h-auto object-contain rounded shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
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
                  <span className="text-xl font-black text-white">{card.price} <span className='text-sm text-gray-400'>THB</span></span>
                </div>
                <button
                  onClick={() => addToCart(card)}
                  className="btn btn-primary btn-sm w-full ..."
                >
                  ADD TO CART
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />

    </div>
  );
};

export default Card
