import { memo, useEffect, useState } from 'react'
import { ContactCard } from 'src/components/ContactCard'
import styles from './favoriteListPage.module.scss'
import { ContactDto } from 'src/types/dto/ContactDto'
import { useAppSelector } from 'src/redux/hooks'
import { EmptyListFavorites } from 'src/constants/variables'
import { Loading } from 'src/components/Loading'

const findContactsByIds = (
	ids: string[],
	allContacts: ContactDto[]
): ContactDto[] => {
	return allContacts.filter(contact => ids.includes(contact.id))
}

export const FavoriteListPage = memo(() => {
	const favoriteContactIds = useAppSelector(
		state => state.contacts.favoriteContacts
	)
	const contacts = useAppSelector(state => state.contacts.contacts)

	const [filteredFavoriteContacts, setFilteredFavoriteContacts] = useState<
		ContactDto[]
	>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)
		const filteredContacts = findContactsByIds(favoriteContactIds, contacts)
		setFilteredFavoriteContacts(filteredContacts)
		setLoading(false)
	}, [favoriteContactIds, contacts])

	return (
		<div className={styles.favoriteList}>
			{loading ? (
				<div className={styles.loadingContainer}>
					<Loading />
				</div>
			) : filteredFavoriteContacts.length === 0 ? (
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
