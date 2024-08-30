import { observer } from 'mobx-react-lite'
import { ContactCard } from 'src/components/ContactCard'
import styles from './favoriteListPage.module.scss'
import { EmptyListFavorites } from 'src/constants/variables'
import { favoritesStore } from 'src/store/favoriteStore/favoriteStore'
import { contactStore } from 'src/store/contactStore/contactStore'

export const FavoriteListPage = observer(() => {
	const filteredFavoriteContacts = contactStore.contactsData.filter(contact =>
		favoritesStore.favoriteContacts.includes(contact.id)
	)

	return (
		<div className={styles.favoriteList}>
			{filteredFavoriteContacts.length === 0 ? (
				<div className={styles.emptyListFavorites}>{EmptyListFavorites}</div>
			) : (
				<div className={styles.contactCardsContainer}>
					{filteredFavoriteContacts.map(contact => (
						<div key={contact.id} className={styles.contactCard}>
							<ContactCard contact={contact} withLink />
						</div>
					))}
				</div>
			)}
		</div>
	)
})
