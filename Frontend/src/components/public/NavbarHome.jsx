import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import { Link } from "react-router"
function NavbarHome() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li><a>Home</a></li>
              <li><a>Card</a></li>
              <li><a>New Card</a></li>
              <li><a>About</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">DONGCARD</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>Home</a></li>
            <li><Link to='card'>Card</Link></li>
            <li><Link to='newCard'>newCard</Link></li>
            <li><Link to='about'>About</Link></li>
          </ul>
        </div>
        <div className="navbar-end gap-3">
          <button className="btn btn-soft"
            onClick={() => document.getElementById('login-form').showModal()} type='button'
          >เข้าสู่ระบบ</button>

          <button className="btn btn-info"
            onClick={() => document.getElementById('register-form').showModal()} type='button'
          >สมัครสมาชิก</button>
        </div>
      </div>

      <dialog id="register-form" className="modal">
        <div className="modal-box">

          <RegisterForm />

        </div>
      </dialog>

      <dialog id="login-form" className="modal">
        <div className="modal-box">

          <LoginForm />

        </div>
      </dialog>
    </>

  )
}

export default NavbarHome