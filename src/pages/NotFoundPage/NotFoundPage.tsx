import { NothingFound } from 'src/components/NothingFound'
import styles from './index.module.scss'

export const NotFoundPage = () => {
	return (
		<div className={styles.body}>
			<NothingFound />
		</div>
	)
}
