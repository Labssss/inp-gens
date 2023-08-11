import { useState, useContext} from "react";
import { Link, useLocation } from "react-router-dom";
import { CustomContext } from "../Context";

export function Navigation() {
    const {role, logOutUser, accessLvl, isLogged} = useContext(CustomContext);
    const location = useLocation();
    return (
        <aside className="hidden w-64 overflow-y-auto bg-gray-800 md:block flex-shrink-0 sticky top-0 max-h-screen">
        <div className="py-4 text-gray-400">
          <Link className="ml-6 text-lg font-bold text-gray-200" to="/">
            Inpost Gens
          </Link>
          {
            isLogged && 
            <ul>
              {
                accessLvl >= 2 && 
                <li className="relative px-6 py-3">
                  {(location.pathname === '/genScreen') && <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true" />}
                  <Link className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200 ${(location.pathname === '/genScreen') && 'text-gray-100'}`} to="/genScreen">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                    <span className="ml-4">Screen</span>
                  </Link>
                </li>
              }
              {
                accessLvl >= 1 && 
                <li className="relative px-6 py-3">
                  {(location.pathname === '/genReceipt') && <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true" />}
                  <Link className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200 ${(location.pathname === '/genReceipt') && 'text-gray-100'}`} to="/genReceipt">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-list-check w-5 h-5" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M3.5 5.5l1.5 1.5l2.5 -2.5"></path>
                    <path d="M3.5 11.5l1.5 1.5l2.5 -2.5"></path>
                    <path d="M3.5 17.5l1.5 1.5l2.5 -2.5"></path>
                    <path d="M11 6l9 0"></path>
                    <path d="M11 12l9 0"></path>
                    <path d="M11 18l9 0"></path>
                  </svg>
                    <span className="ml-4">Receipt</span>
                  </Link>
                </li>
              }
              
              <li className="relative px-6 py-3 border-t border-solid border-gray-50">
                <button className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200`} onClick={() => logOutUser()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout w-5 h-5" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                  <path d="M7 12h14l-3 -3m0 6l3 -3"></path>
                </svg>
                  <span className="ml-4">Exit</span>
                </button>
              </li>
            </ul>
          }
        </div>
      </aside>
    )
}