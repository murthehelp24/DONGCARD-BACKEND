import { registerSchema } from "../../validations/authValidate"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import mainApi from "../../api/mainApi"
import { toast, ToastContainer } from "react-toastify"


export default function RegisterForm() {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      email: '',
      password: '',
    }
  })
  const { errors, isSubmitting } = formState


  const onSubmit = async (data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const resp = await mainApi.post('/auth/register', data)
      toast.success(resp.data.message, { containerId: 'register-modal' })

      setTimeout(() => {
      const modal = document.getElementById('register-form')
      if (modal) {
        modal.close() 
        reset()      
      }
    }, 2000)
    } catch (error) {
      // console.dir(error)
      const errMsg = error.response?.data.message || error.message
      toast.error(errMsg, { containerId: 'register-modal', position: 'top-center' })
    }
  }
  return (
    <>
      <ToastContainer containerId="register-modal" />
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => reset()}>✕</button>
      </form>
      <p className='text-2xl text-center mb-5'>สมัครสมาชิก</p>
      <form onSubmit={handleSubmit(onSubmit)}>

        <fieldset disabled={isSubmitting}>
          <div className='w-full flex flex-col gap-4'>
            <div>
              <input type="text" placeholder="Username" className="input w-full"
                {...register('username')}
              />
              <p className="text-sm text-error">{errors.username?.message}</p>
            </div>

            <div>
              <input type="text" placeholder="Email" className="input w-full"
                {...register('email')}
              />
              <p className="text-sm text-error">{errors.email?.message}</p>
            </div>

            <div>
              <input type="text" placeholder="Password" className="input w-full"
                {...register('password')}
              />
              <p className="text-sm text-error">{errors.password?.message}</p>
            </div>
          </div>
          <button className="btn btn-info w-full mt-5" >ลงทะเบียน
            {isSubmitting && <span className="loading loading-spinner text-white mx-2"></span>}
          </button>
        </fieldset>
      </form>
    </>
  )
}
