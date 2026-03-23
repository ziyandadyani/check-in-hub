import { Outlet } from "react-router-dom";
import Nav from '../Nav'

const MainLayout = () => {
  return (
    <>
      <Nav></Nav>
      <div style={{ backgroundColor: "#F9FAFB", minHeight: "91vh" }}> <Outlet /></div>

    </>
  )
}

export default MainLayout