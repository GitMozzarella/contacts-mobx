import { NavLink } from 'react-router-dom'
import { PathList } from 'src/router/PathList'
import styles from './menu.module.scss'
import { IoHome } from 'react-icons/io5'
import { NavMenu } from 'src/constants/variables'

export const MainMenu = () => {
	return (
		<header>
			<nav className={styles.nav}>
				<ul className={styles.navList}>
					<div>
						<NavLink
							className={({ isActive }) =>
								isActive ? `${styles.logo} ${styles.active}` : styles.logo
							}
							to={PathList.home}
						>
							<IoHome />
						</NavLink>
					</div>
					<li className={styles.navList_item}>
						<NavLink
							className={({ isActive }) =>
								isActive
									? `${styles.navList_item} ${styles.active}`
									: styles.navList_item
							}
							to={PathList.allContacts}
						>
							{NavMenu.allContacts}
						</NavLink>
					</li>
					<li className={styles.navList_item}>
						<NavLink
							className={({ isActive }) =>
								isActive
									? `${styles.navList_item} ${styles.active}`
									: styles.navList_item
							}
							to={PathList.allGroups}
						>
							{NavMenu.allGroups}
						</NavLink>
					</li>
					<li className={styles.navList_item}>
						<NavLink
							className={({ isActive }) =>
								isActive
									? `${styles.navList_item} ${styles.active}`
									: styles.navList_item
							}
							to={PathList.favorite}
						>
							{NavMenu.favorites}
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	)
}
