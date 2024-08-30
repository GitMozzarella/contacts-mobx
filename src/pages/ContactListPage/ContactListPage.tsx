import React, { useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { ContactDto } from 'src/types/dto/ContactDto'
import { groupStore } from 'src/store/groupStore/groupStore'
import {
	FilterForm,
	FilterFormValues
} from 'src/components/FilterForm/FilterForm'
import { EmptyContactsList } from 'src/components/EmptyContactsList'
import styles from './contactListPage.module.scss'
import { contactStore } from 'src/store/contactStore/contactStore'
import { ContactCard } from 'src/components/ContactCard'
import { EMPTY_STRING } from 'src/constants/variables'

export const ContactListPage = observer(() => {
	const [filteredContacts, setFilteredContacts] = useState<ContactDto[]>([])
	const [filterValues, setFilterValues] = useState<Partial<FilterFormValues>>({
		name: '',
		groupId: ''
	})

	const contacts = contactStore.contactsData
	const groups = groupStore.groupsData

	useEffect(() => {
		contactStore.getContacts()
		groupStore.getGroups()
	}, [])

	const applyFilters = useCallback(() => {
		let filtered = contacts

		const nameFilter = filterValues.name || EMPTY_STRING

		if (nameFilter) {
			filtered = filtered.filter(contact =>
				contact.name.toLowerCase().includes(nameFilter.toLowerCase())
			)
		}

		if (filterValues.groupId) {
			const groupContactIds =
				groups.find(group => group.id === filterValues.groupId)?.contactIds ||
				[]

			filtered = filtered.filter(contact =>
				groupContactIds.includes(contact.id)
			)
		}

		setFilteredContacts(filtered)
	}, [contacts, filterValues, groups])

	useEffect(() => {
		applyFilters()
	}, [applyFilters])

	const handleFilterSubmit = (values: Partial<FilterFormValues>) => {
		setFilterValues(values)
	}

	return (
		<div className={styles.contact_listPage}>
			<div className={styles.filter_formContainer}>
				<FilterForm
					initialValues={filterValues}
					onSubmit={handleFilterSubmit}
				/>
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
		</div>
	)
})
