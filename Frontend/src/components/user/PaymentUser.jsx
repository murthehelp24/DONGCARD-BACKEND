import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import mainApi from '../../api/mainApi'
import Swal from 'sweetalert2' 

function PaymentUser() {
  const { orderId } = useParams() 
  const navigate = useNavigate()
  const [file, setFile] = useState(null) 
  const [preview, setPreview] = useState(null) 
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile)) 
    }
  }

  const handleNotifyPayment = async (e) => {
    e.preventDefault()
    if (!file) {
      return Swal.fire({
        icon: 'warning',
        title: 'ลืมแนบสลิป!',
        text: 'กรุณาเลือกรูปภาพหลักฐานการโอนเงินก่อนครับ',
        confirmButtonColor: '#3085d6'
      })
    }
    
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('paymentSlip', file) 

      await mainApi.patch(`/orders/${orderId}/payment`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      await Swal.fire({
        icon: 'success',
        title: 'แจ้งชำระเงินสำเร็จ',
        text: 'เราได้รับข้อมูลแล้ว รอ Admin ตรวจสอบสักครู่',
        confirmButtonColor: '#10b981', 
        timer: 3000,
        showConfirmButton: false
      })

      navigate('/card/history') 
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: err.response?.data?.message || "ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
        confirmButtonColor: '#ef4444'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-slate-800 p-8 text-white text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">แจ้งโอนเงิน</h2>
          <p className="opacity-80 mt-2 text-lg font-mono">Order ID: #{orderId}</p>
        </div>

        <div className="p-8">
          <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl mb-8 flex flex-col items-center text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">บัญชีปลายทาง</span>
            <p className="text-xl font-bold text-slate-800 tracking-wider">123-4-56789-0</p>
            <p className="text-md font-medium text-slate-600">ธนาคารกสิกรไทย</p>
            <div className="mt-3 px-4 py-1 bg-white rounded-full shadow-sm border border-slate-100">
              <p className="text-sm font-semibold text-primary">ชื่อบัญชี: DONGCARD</p>
            </div>
          </div>

          <form onSubmit={handleNotifyPayment} className="space-y-6">
            <div className="form-control">
              <label className="label pt-0">
                <span className="label-text font-bold text-gray-700 text-lg">หลักฐานการโอน (สลิป)</span>
              </label>
              
              <div className="mt-2 flex flex-col items-center gap-4">
                {preview ? (
                  <div className="relative w-full group">
                    <img 
                      src={preview} 
                      alt="Slip Preview" 
                      className="w-full h-64 object-cover rounded-2xl border-4 border-slate-100 shadow-sm" 
                    />
                    <button 
                      type="button"
                      onClick={() => { setFile(null); setPreview(null); }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="w-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:bg-slate-50 hover:border-primary transition-all group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-10 h-10 mb-3 text-slate-400 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">คลิกเพื่ออัปโหลด</span> หรือลากวาง</p>
                      <p className="text-xs text-slate-400">JPG, PNG หรือ PDF</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </label>
                )}
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading || !file}
              className={`btn btn-primary w-full text-lg font-bold rounded-2xl shadow-lg h-14 
                ${loading ? 'loading' : ''} transition-all active:scale-95`}
            >
              {loading ? 'กำลังประมวลผล...' : 'ยืนยันการแจ้งโอน'}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default PaymentUser
