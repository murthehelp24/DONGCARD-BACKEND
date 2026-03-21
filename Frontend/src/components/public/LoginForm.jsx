import { loginSchema } from "../../validations/authValidate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import mainApi from "../../api/mainApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useAuth } from "../../utils/authContext";

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const { errors, isSubmitting } = formState;
  const onSubmit = async (data) => {
    try {
      const resp = await mainApi.post('/auth/login', data);
      const { user: userData, token, message } = resp.data;
      localStorage.setItem('token', token);

      toast.success(resp.data.message, { containerId: 'login-modal' })

      setTimeout(() => {
        const modal = document.getElementById('login-form');
        if (modal) {
          modal.close();
          reset();
        }

        login(userData);
        if (userData.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      }, 2000);

    } catch (error) {
      const errMsg = error.response?.data.message || error.message
      toast.error(errMsg, { containerId: 'login-modal', position: 'top-center' })
    }
  };


  return (
    <>
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => reset()}>✕</button>
      </form>
      <p className='text-2xl text-center mb-5'>เข้าสู่ระบบ</p>
      <form onSubmit={handleSubmit(onSubmit)}>

        <fieldset disabled={isSubmitting}>
          <div className='w-full flex flex-col gap-4'>

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
          <button className="btn btn-info w-full mt-5" >เข้าสู่ระบบ
            {isSubmitting && <span className="loading loading-spinner text-white mx-2"></span>}
          </button>
        </fieldset>
        <div className="divider">หรือ</div>
        <p className="text-center text-sm">
          ยังไม่มีบัญชี? <a href="/register" className="link link-primary">สมัครสมาชิก</a>
        </p>
      </form>
    </>
  );
}


