import { useCart } from '../../utils/CartContext'
import { Link, useNavigate } from 'react-router'
import { Trash2, Plus, Minus } from 'lucide-react'
import mainApi from '../../api/mainApi'

function CartUser() {
  const { cartItems, totalPrice, cartCount, removeFromCart, updateQuantity, clearCart } = useCart()
  const navigate = useNavigate();

  const handleCheckout = async () => {
    // เช็คว่ามีสินค้าไหม
    if (cartItems.length === 0) {
      alert("ตะกร้าสินค้าว่างเปล่า กรุณาเลือกสินค้าก่อนครับ")
      return
    }

    const address = window.prompt("กรุณากรอกที่อยู่สำหรับการจัดส่ง:")
    if (!address) {
      alert("จำเป็นต้องกรอกที่อยู่เพื่อดำเนินการต่อครับ")
      return;
    }

    // ยืนยันการสั่งซื้อ 
    const isConfirm = window.confirm(`ยืนยันการสั่งซื้อทั้งหมด ${totalPrice}$ ใช่หรือไม่?`)

    if (isConfirm) {
      try {
        // เตรียม Data ให้ db
        const orderData = {
          address: address,
          items: cartItems.map(item => ({
            cardId: item.id,
            quantity: Number(item.quantity),
            soldPrice: Number(item.price)
          }))
        };

        // ยิง API POST /api/orders
        const response = await mainApi.post('/orders', orderData);

        // เช็คโครงสร้างตามรูป image_c13507.png
        if (response.data && response.data.order) {
          const orderId = response.data.order.id

          alert("สั่งซื้อสำเร็จ!")
          clearCart()

          navigate(`/card/payment/${orderId}`)
        } else {
          console.error("Unexpected response structure:", response.data)
          alert("สร้างออเดอร์สำเร็จแต่หา ID ไม่เจอ")
        }

      } catch (err) {
        console.error("Checkout Error:", err.response?.data)
        alert("เกิดข้อผิดพลาด: " + (err.response?.data?.message || "Internal Server Error"))
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1e293b]">ตะกร้าสินค้า</h1>
        <p className="text-gray-500 mb-8">คุณมีการ์ดในตะกร้า {cartCount} ใบ</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((card) => (
              <div key={card.id} className="flex items-center bg-gradient-to-r from-gray-200 to-gray-300 p-4 rounded-2xl shadow-sm relative group">
                <div className="w-24 h-32 bg-white rounded-lg overflow-hidden flex-shrink-0">
                  <img src={`https://wsrv.nl/?url=${card.image}`} alt={card.name} className="w-full h-auto object-contain" />
                </div>
                <div className="ml-6 flex-grow ">
                  <h3 className="text-xl font-bold">{card.name}</h3>
                  <p className="text-gray-500">{card.id}</p>
                  <h3 className="badge badge-ghost badge-sm rounded-sm">{card.rarity}</h3>
                  <div className="flex items-center bg-[#1e293b] w-fit rounded-lg mt-4 overflow-hidden">
                    <button onClick={() => updateQuantity(card.id, -1)} className="p-2 text-white"><Minus size={14} /></button>
                    <span className="px-4 text-white font-bold">{card.quantity}</span>
                    <button onClick={() => updateQuantity(card.id, 1)} className="p-2 text-white"><Plus size={14} /></button>
                  </div>
                </div>
                <div className="text-right flex flex-col justify-between h-32">
                  <button onClick={() => removeFromCart(card.id)} className="text-gray-400 hover:text-red-500 flex justify-end"><Trash2 size={20} /></button>
                  <p className="text-2xl font-bold">{card.price * card.quantity} THB</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-300 p-6 rounded-3xl h-fit shadow-md">
            <h2 className="text-xl font-bold mb-6">สรุปการสั่งซื้อ</h2>
            <div className="flex justify-between text-2xl font-bold py-6 border-t border-gray-400">
              <span>ราคารวม</span>
              <span>{totalPrice} THB</span>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleCheckout}
                className="btn btn-block bg-[#1e293b] hover:bg-black text-white border-none rounded-full py-4 h-auto"
              >
                ดำเนินการชำระเงิน
              </button>
              <Link to="/user" className="btn btn-block btn-outline border-gray-500 text-gray-600 rounded-full py-4 h-auto text-center">
                เลือกซื้ออีก
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartUser;