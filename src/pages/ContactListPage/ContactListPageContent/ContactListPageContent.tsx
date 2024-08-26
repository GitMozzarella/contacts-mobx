import React from 'react'
import { ContactDto } from 'src/types/dto/ContactDto'
import { ContactCard } from 'src/components/ContactCard'
import {
	FilterForm,
	FilterFormValues
} from 'src/components/FilterForm/FilterForm'
import { EmptyContactsList } from 'src/components/EmptyContactsList'
import { Loading } from 'src/components/Loading'
import styles from '../contactListPage.module.scss'

interface ContactListPageContentProps {
	loading: boolean
	filteredContacts: ContactDto[]
	filter: Partial<FilterFormValues>
	onSubmit: (fv: Partial<FilterFormValues>) => void
}

export const ContactListPageContent: React.FC<ContactListPageContentProps> = ({
	loading,
	filteredContacts,
	filter,
	onSubmit
}) => (
	<div className={styles.contact_listPage}>
		{loading ? (
			<div className={styles.loader}>
				<Loading />
			</div>
		) : (
			<>
				<div className={styles.filter_formContainer}>
					<FilterForm initialValues={filter} onSubmit={onSubmit} />
				</div>
				{filteredContacts.length === 0 ? (
					<EmptyContactsList />
				) : (
					<div className={styles.contact_cardsContainer}>
						{filteredContacts.map(contact => (
							<ContactCard key={contact.id} contact={contact} withLink />
						))}
					</div>
				)}
			</>
		)}
	</div>
)
