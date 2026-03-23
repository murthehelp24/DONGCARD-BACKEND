import { useState, useEffect } from 'react'
import mainApi from '../../api/mainApi'
import WishlistCard from '../../components/user/WishlistCard'
import { Link } from 'react-router'

function WishlistUser() {
  const [wishlistItems, setWishlistItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setIsLoading(true)
        const response = await mainApi.get('/wishlist')

        if (response.data && Array.isArray(response.data.items)) {
          setWishlistItems(response.data.items)
          // console.log(response.data.items)
        } else {
          setWishlistItems([])
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error)
        setWishlistItems([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchWishlist()
  }, [])

  const handleRemoveFromList = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id))
  }

  if (isLoading) return <div className="p-10 text-center text-white">กำลังโหลด...</div>

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">รายการโปรดของฉัน</h1>

      {Array.isArray(wishlistItems) && wishlistItems.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="relative group bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 transition-all hover:scale-[1.02]">

              <WishlistCard
                card={{ ...item.card, isFavorited: true }}
                onRemove={() => handleRemoveFromList(item.id)}
              />

              <div className="aspect-[3/4] overflow-hidden">
                <Link to={`/card/${item.card.id}`} >
                  <img
                    src={`https://wsrv.nl/?url=${item.card.image}`}
                    alt={item.card?.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
              </div>

              <div className="p-3">
                <h3 className="text-lg font-semibold text-white truncate">{item.card?.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{item.card?.id}</p>
                <p className="badge badge-ghost badge-sm rounded-sm">{item.card?.rarity}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-700">
          <p className="text-slate-400 text-lg">คุณยังไม่มีรายการที่ถูกใจ</p>
        </div>
      )}
    </div>
  )
}

export default WishlistUser