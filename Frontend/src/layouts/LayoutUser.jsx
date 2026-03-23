import { Outlet } from "react-router"
import NavbarUser from "../components/user/NavbarUser"


function LayoutUser() {
  return (
      <>
      <NavbarUser/>
      <Outlet/>
      </>
  )
}

export default LayoutUser