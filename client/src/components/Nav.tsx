import logo from '../assets/image_1_1774189292507-removebg-preview.png'

const Nav = () => {
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
              User Name
            </span>
            <button
              // onClick={logout}
              className="p-2 rounded-lg hover:bg-muted transition-colors active:scale-95"
              title="Sign out"
            >
              Logout
              {/* <LogOut className="w-4 h-4 text-muted-foreground" /> */}
            </button>
          </div>
        </div>
      </div>
    </>



  )
}

export default Nav