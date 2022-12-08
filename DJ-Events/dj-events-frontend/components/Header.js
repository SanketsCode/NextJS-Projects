import Link from "next/link";
import styles from '@/styles/Header.module.css';
import Search from "./Search";
import AuthContext from "@/context/AuthContext";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useContext } from "react";

export default function Header() {
    const {user,Logout} = useContext(AuthContext);
  return (
   <header className={styles.header}>
        <div className={styles.logo}>
            <Link href='/'>
                DJ EVENTS
            </Link>
        </div>
        <Search />
        <nav>
            <ul>
                <li>
                    <Link href="/events">Events</Link>
                </li>
                {user ? <>
    
                    <li>
                    <Link href="/events/add">
                        Add Event
                    </Link>

                </li>
                <li>
                    <Link href="/accounts/dashboard">
                        Dashboard
                    </Link>

                </li>
                <li>
                    <button onClick={() => {
                        Logout()
                    }} className="btn-secondary btn-icon">
                        <FaSignOutAlt /> Logout
                    </button>
                </li>
                </> : <>

                <li>
                    <Link href="/accounts/login" className="btn-secondary btn-icon">
                       <FaSignInAlt /> Login
                    </Link>
                </li>
                
                </>}
               
               
                {/* <li>
                    <Link href="/accounts/login" className="btn-secondary btn-icon">
                       <FaSignOutAlt /> Log out
                    </Link>
                </li> */}
            </ul>
        </nav>
   </header>
  )
}
