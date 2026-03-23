import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import mainApi from '../../api/mainApi'

function PaymentUser() {
  const { orderId } = useParams() 
  const navigate = useNavigate()
  const [slipUrl, setSlipUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleNotifyPayment = async (e) => {
    e.preventDefault()
    
    setLoading(true)
    try {
      await mainApi.patch(`/orders/${orderId}/payment`, {
        paymentSlip: slipUrl
      })
      alert("แจ้งชำระเงินสำเร็จ! รอการตรวจสอบจาก Admin")
      navigate('/user/history') 
    } catch (err) {
      alert(err.response?.data?.message || "เกิดข้อผิดพลาด")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6">แจ้งโอนเงิน (Order #{orderId})</h2>
      <div className="bg-gray-100 p-4 rounded-xl mb-6">
        <p className="text-sm text-gray-600">บัญชีธนาคาร: 123-4-56789-0 (ธนาคารตัวอย่าง)</p>
        <p className="font-bold text-lg">ชื่อบัญชี: มั่งมี มีทรัพย์</p>
      </div>

      <form onSubmit={handleNotifyPayment} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">ลิงก์รูปภาพสลิป (URL)</label>
          <input 
            type="text" 
            className="input input-bordered w-full"
            placeholder="https://example.com/slip.jpg"
            value={slipUrl}
            onChange={(e) => setSlipUrl(e.target.value)}
          />
        </div>
        <button 
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? 'กำลังส่งข้อมูล...' : 'แจ้งโอนเงิน'}
        </button>
      </form>
    </div>
  )
}

export default PaymentUser