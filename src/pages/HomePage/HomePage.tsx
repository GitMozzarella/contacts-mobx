import styles from './home.module.scss'
import {
	HOME_PAGE_TITLE,
	HOME_PAGE_DESCRIPTION,
	HOME_PAGE_FEATURES,
	HOME_PAGE_INSTRUCTIONS
} from '../../constants/homePageMarkup'

export const HomePage = () => {
	return (
		<div className={styles.container}>
			<h1>{HOME_PAGE_TITLE}</h1>
			<p>{HOME_PAGE_DESCRIPTION}</p>
			<ul>
				{HOME_PAGE_FEATURES.map((feature, index) => (
					<li key={index}>{feature}</li>
				))}
			</ul>
			<p>{HOME_PAGE_INSTRUCTIONS}</p>
		</div>
	)
}
