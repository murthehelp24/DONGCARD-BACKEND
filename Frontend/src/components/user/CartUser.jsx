import { useCart } from '../../utils/CartContext'
import { Link, useNavigate } from 'react-router'
import { Trash2, Plus, Minus } from 'lucide-react'
import mainApi from '../../api/mainApi'
import Swal from 'sweetalert2'


function CartUser() {
  const { cartItems, totalPrice, cartCount, removeFromCart, updateQuantity, clearCart } = useCart()
  const navigate = useNavigate()


  const handleCheckout = async () => {
    // 1. เช็คว่ามีสินค้าไหม
    if (cartItems.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'ตะกร้าว่างเปล่า',
        text: 'กรุณาเลือกสินค้าก่อนดำเนินการชำระเงินครับ',
        confirmButtonColor: '#3085d6'
      })
      return
    }

    // 2. ถามที่อยู่ด้วย SweetAlert Input
    const { value: address } = await Swal.fire({
      title: 'กรุณากรอกที่อยู่สำหรับการจัดส่ง',
      input: 'textarea',
      inputPlaceholder: 'พิมพ์ที่อยู่ของคุณที่นี่...',
      showCancelButton: true,
      confirmButtonText: 'ถัดไป',
      cancelButtonText: 'ยกเลิก',
      inputValidator: (value) => {
        if (!value) {
          return 'จำเป็นต้องกรอกที่อยู่เพื่อดำเนินการต่อครับ';
        }
      }
    });

    // ถ้ากดยกเลิกหรือไม่กรอกที่อยู่
    if (!address) return;

    // 3. ยืนยันการสั่งซื้อ
    const confirmResult = await Swal.fire({
      title: 'ยืนยันการสั่งซื้อ?',
      text: `ยอดรวมทั้งหมดของคุณคือ ${totalPrice}$`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, สั่งซื้อเลย!',
      cancelButtonText: 'ตรวจสอบอีกครั้ง'
    })

    if (confirmResult.isConfirmed) {
      try {
        // แสดง Loading ระหว่างรอ API
        Swal.showLoading();

        const orderData = {
          address: address,
          items: cartItems.map(item => ({
            cardId: item.id,
            quantity: Number(item.quantity),
            soldPrice: Number(item.price)
          }))
        }

        const response = await mainApi.post('/orders', orderData)

        if (response.data?.order?.id) {
          const orderId = response.data.order.id

          await Swal.fire({
            icon: 'success',
            title: 'สั่งซื้อสำเร็จ!',
            text: 'กำลังพาคุณไปยังหน้าชำระเงิน',
            timer: 2000,
            showConfirmButton: false
          });

          clearCart()
          navigate(`/card/payment/${orderId}`)
        } else {
          throw new Error("Unexpected response structure")
        }

      } catch (err) {
        console.error("Checkout Error:", err.response?.data)
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: err.response?.data?.message || "ไม่สามารถสร้างออเดอร์ได้ในขณะนี้"
        })
      }
    }
  };


  return (
    <div className="min-h-screen p-8 text-base-200">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#d8d8d8]">ตะกร้าสินค้า</h1>
        <p className="text-gray-500 mb-8">คุณมีการ์ดในตะกร้า {cartCount} ใบ</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((card) => (
              <div key={card.id} className="flex items-center bg-gradient-to-r from-gray-600 to-gray-100 p-4 rounded-2xl shadow-sm relative group">
                <div className="w-24 h-32 bg-white rounded-lg overflow-hidden flex-shrink-0">
                  <img src={`https://wsrv.nl/?url=${card.image}`} alt={card.name} className="w-full h-auto object-contain" />
                </div>
                <div className="ml-6 flex-grow ">
                  <h3 className="text-xl font-bold">{card.name}</h3>
                  <p className="text-gray-300">{card.id}</p>
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

          <div className="bg-gradient-to-b from-gray-500 to-gray-100 p-6 rounded-3xl h-fit shadow-md">
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
              <Link to="/card" className="btn btn-block btn-outline border-gray-500 text-gray-600 rounded-full py-4 h-auto text-center">
                เลือกซื้ออีก
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartUser