import { Outlet } from 'react-router-dom'
import { MainMenu } from '../MainMenu'
import styles from './layout.module.scss'
export const MainLayout = () => {
	return (
		<div className={styles.layout}>
			<div className={styles.navbar}>
				<MainMenu />
			</div>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	)
}
