import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import './navbar.css'
import { useContext } from 'react'
import UserContext from '../../Context/userContext'


// import logo from "logo.png"

const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Features', href: '#', current: false },
  { name: 'Our Faculties', href: '#', current: false },
  { name: 'Courses', href: '#', current: false },
  { name: 'About', href: '#', current: false },
  { name: 'Contact Us', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function Navbar({loginButton, setLoginButton}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const handleSignIn = () => {
    setMobileMenuOpen(false);
    setLoginButton("signin");
  
  }
  const userInfo = useContext(UserContext);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      
    <nav className="flex items-center justify-between p-6 lg:px-8 z-1" aria-label="Global">
      <div className="flex lg:flex-1">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Guru Vihaar</span>
          {/* <img
            className="h-10 w-auto"
            src={logo}
            alt=""
          /> */}
          <img className="h-10 w-auto" src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" />
        </a>
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      {loginButton === "none" && 
      <div className="hidden lg:flex lg:gap-x-12 lg:gap-y-4">
        {navigation.map((item) => (
          <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-400 hover:text-gray-600"s>
            <div  className="h-8 hover:border-b-2 hover:border-gray-800">{item.name}</div>
          </a>
        ))}  
      </div> }
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
          {
            userInfo.loggedUser ? `Welcome ${userInfo.loggedUser}` : 
            <div onClick={() => {setLoginButton("signin")}} > Log-in / Sign Up <span aria-hidden="true">&rarr;</span></div> 
          }
        </a>
      </div>
    </nav>
    <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
      <div className="fixed inset-0 z-50" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Guruvihaar</span>
            <img className="h-10 w-auto" src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" />
          </a>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {loginButton === "none" &&
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="py-6">
              <a
                href="#"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                <div onClick={handleSignIn} > Log in <span aria-hidden="true">&rarr;</span></div> 
              </a>
            </div>
          </div> 
        </div>}
      </Dialog.Panel>
    </Dialog>
  </header>
  )
}
