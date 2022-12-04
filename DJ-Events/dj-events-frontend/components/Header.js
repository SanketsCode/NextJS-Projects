import Link from "next/link";
import styles from '@/styles/Header.module.css';
import Search from "./Search";

export default function Header() {
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
                    <Link href="/">Events</Link>
                </li>
                <li>
                    <Link href="/events/add">
                        Add Event
                    </Link>

                </li>
            </ul>
        </nav>
   </header>
  )
}
