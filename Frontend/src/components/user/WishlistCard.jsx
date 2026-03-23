import { useState } from 'react'
import mainApi from '../../api/mainApi'

function WishlistCard(props) {
  const { card } = props
  const [isLiked, setIsLiked] = useState(card.isFavorited || false)
  
  const toggleWishlist = async (id) => {
  try {
    if (isLiked) {
      const response = await mainApi.delete(`/wishlist/${id}`);
      
      if (response.status === 200) {
        setIsLiked(false);
      }
    } else {

      const response = await mainApi.post('/wishlist', { 
        cardId: id 
      });

      if (response.status === 200 || response.status === 201) {
        setIsLiked(true);
      }
    }
  } catch (error) {
    console.error("Error updating wishlist:", error.response?.data?.message || error.message);
  }
};


  return (
    <div>
      <button
        onClick={() => toggleWishlist(card.id)}
        className="absolute top-2 left-2 z-10 p-1.5 rounded-full bg-black/40 hover:bg-black/60 transition-colors group/heart"
      >
        <svg
          xmlns="http://www.w3.org"
          className={`h-5 w-5 transition-transform active:scale-125 ${
            isLiked ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-white'
          }`}
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </button>
    </div>
  )
}

export default WishlistCard
