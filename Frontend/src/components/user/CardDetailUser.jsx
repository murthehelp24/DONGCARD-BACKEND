import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import mainApi from '../../api/mainApi'
import { useCart } from '../../utils/CartContext'

const CardDetailUser = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [card, setCard] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchCardDetail = async () => {
      try {
        setLoading(true)
        const response = await mainApi.get(`/cards/${id}`)
        setCard(response.data.card);
      } catch (err) {
        console.error("Error fetching card details:", err)
      } finally {
        setLoading(false)
      }
    };

    fetchCardDetail()
  }, [id])

  if (loading) return <div className="p-10 text-center text-white">Loading...</div>
  if (!card) return <div className="p-10 text-center text-white">Card not found.</div>

  return (
    <div className="min-h-screen bg-base-200 p-6 flex justify-center items-center">
      <div className="card lg:card-side bg-[#23262f] shadow-xl max-w-4xl border border-gray-700">
        <figure className="p-6 bg-black/20 lg:w-1/2">
          <img
            src={`https://wsrv.nl/?url=${card.image}`}
            alt={card.name}
            className="w-full h-auto object-contain rounded shadow-2xl group-hover:scale-105 transition-transform duration-500"
          />
        </figure>
        <div className="card-body lg:w-1/2 text-white ">
          <div className='flex justify-end'>
            <button onClick={() => navigate(-1)} className="btn btn-ghost btn-lg w-fit text-info ">← Back</button>
          </div>

          <h2 className="card-title text-3xl font-bold border-b border-primary/30 pb-2">{card.name}</h2>

          <div className="py-4 space-y-2">
            <p><span className="text-gray-500 uppercase text-xs block">ID</span> {card.id}</p>
            <p><span className="text-gray-500 uppercase text-xs block">Rarity</span>
              <span className="badge badge-primary">{card.rarity}</span>
            </p>
            <p><span className="text-gray-500 uppercase text-xs ">Color :</span>{card.color}</p>
            {card.effect && <p className="text-gray-400 mt-4 text-xl">{card.effect}</p>}
          </div>

          <div className="mt-auto">
            <div className="mb-4">
              <span className="text-xs text-gray-500 block uppercase">Price</span>
              <span className="text-3xl font-black text-white">{card.price} <span className="text-sm text-gray-400">THB</span></span>
            </div>
            <button
              onClick={() => addToCart(card)}
              className="btn btn-primary w-full"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailUser