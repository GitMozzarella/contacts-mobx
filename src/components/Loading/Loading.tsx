import styles from './loading.module.scss'
import { Loader } from '@mantine/core'

export const Loading = () => {
	return (
		<div className={styles.loading}>
			<Loader color='white' size='xl' type='dots' />
		</div>
	)
}
