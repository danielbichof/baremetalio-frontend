

import Link from 'next/link';
import styles from './styles/header.module.css';


export default function Header() {
	return (
	<>
			<header className="flex flex-col items-center justify-between p-10">
				<h1 className={`text-2xl font-semibold ${styles.title}`}>
					<Link href="/">Baremetal.io</Link>
				</h1>
			</header>
	</>
);
}