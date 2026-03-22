import { Outlet } from "react-router"
import BodyUser from "../components/user/BodyUser"
import NavbarUser from "../components/user/NavbarUser"
import HomeUser from "../pages/user/HomeUser"


function LayoutUser() {
  return (
      <>
      <NavbarUser/>
      <Outlet/>
      </>
  )
}

export default LayoutUser