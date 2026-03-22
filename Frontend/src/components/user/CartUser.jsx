import { useCart } from '../../utils/CartContext'
import { Link } from 'react-router'
import { Trash2, Plus, Minus } from 'lucide-react'

function CartUser() {
  const { cartItems, totalPrice, cartCount, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1e293b]">Shopping Cart</h1>
        <p className="text-gray-500 mb-8">You have {cartCount} items in your cart</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((card) => (
              <div key={card.id} className="flex items-center bg-gradient-to-r from-gray-200 to-gray-300 p-4 rounded-2xl shadow-sm relative group">
                <div className="w-24 h-32 bg-white rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={`https://wsrv.nl/?url=${card.image}`}
                    alt={card.name}
                    className="w-full h-auto object-contain rounded shadow-2xl"
                  />
                </div>

                <div className="ml-6 flex-grow">
                  <h3 className="text-xl font-bold text-gray-800">{card.name}</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-tighter">{card.id}</p>
                  <p className="text-xs text-gray-500 uppercase">{card.rarity} CARD</p>

                  <div className="flex items-center bg-[#1e293b] w-fit rounded-lg mt-4 overflow-hidden">
                    <button onClick={() => updateQuantity(card.id, -1)} className="p-2 hover:bg-gray-700 text-white transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="px-4 text-white font-bold">{card.quantity}</span>
                    <button onClick={() => updateQuantity(card.id, 1)} className="p-2 hover:bg-gray-700 text-white transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="text-right flex flex-col justify-between h-32">
                  <button onClick={() => removeFromCart(card.id)} className="text-gray-400 hover:text-red-500 transition-colors self-end">
                    <Trash2 size={20} />
                  </button>
                  <p className="text-2xl font-bold text-gray-700">{card.price * card.quantity}$</p>
                </div>
              </div>
            ))}

            {cartItems.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl shadow-inner">
                <p className="text-gray-400">Your cart is empty.</p>
                <Link to="/user" className="btn btn-ghost btn-sm mt-4 text-primary">Go Shopping</Link>
              </div>
            )}
          </div>

          <div className="bg-gray-300 p-6 rounded-3xl h-fit shadow-md">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 border-b border-gray-400 pb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{totalPrice}$</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Discount</span>
                <span>0$</span>
              </div>
            </div>
            <div className="flex justify-between text-2xl font-bold py-6">
              <span>Total</span>
              <span>{totalPrice}$</span>
            </div>

            <div className="space-y-3">
              <button className="btn btn-block bg-[#1e293b] hover:bg-black text-white border-none rounded-full py-4 h-auto">
                Proceed to Checkout
              </button>
              <Link to="/user" className="btn btn-block btn-outline border-gray-500 text-gray-600 hover:bg-gray-400 rounded-full py-4 h-auto">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartUser
