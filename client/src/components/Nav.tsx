import logo from '../assets/image_1_1774189292507-removebg-preview.png'
import { useNavigate } from 'react-router-dom'

const Nav = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <>

      <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <img src={logo} alt="logo" />
              {/* <MapPin className="w-4 h-4 text-primary-foreground" /> */}
            </div>
            <span className="font-semibold text-sm text-foreground">CheckIn Hub</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:block">
              {/* {user?.name} */}
              {/* User Name */}
            </span>
            <button
              onClick={handleLogout}
              className="p-2  flex flex-direction-row rounded-lg hover:bg-muted transition-colors active:scale-95"
              title="Sign out"
            > <span className="pr-2">LogOut</span>
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="#747474" d="M5 3h6a3 3 0 0 1 3 3v4h-1V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4h1v4a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m3 9h11.25L16 8.75l.66-.75l4.5 4.5l-4.5 4.5l-.66-.75L19.25 13H8z"></path></svg>
              {/* <LogOut className="w-4 h-4 text-muted-foreground" /> */}
            </button>
          </div>
        </div>
      </div>
    </>



  )
}

export default Nav