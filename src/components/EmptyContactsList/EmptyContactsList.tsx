import { EmptyList } from 'src/constants/variables'
import styles from './empty.module.scss'

export const EmptyContactsList = () => {
	return <div className={styles.empty}>{EmptyList}</div>
}
