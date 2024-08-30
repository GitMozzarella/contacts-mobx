import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { ContactListPageContent } from './ContactListPageContent'
import { contactStore } from 'src/store/contactStore/contactStore'
import { groupStore } from 'src/store/groupStore/groupStore'
import { useFilter } from 'src/hooks/useFilter'
import { FilterFormValues } from 'src/components/FilterForm/FilterForm'

export const ContactListPage = observer(() => {
	const contacts = contactStore.contactsData
	const groups = groupStore.groupsData

	const { filterValues, setFilterValues, filteredContacts } = useFilter(
		contacts,
		groups,
		{} as Partial<FilterFormValues>
	)

	const handleSubmit = (values: Partial<FilterFormValues>) => {
		setFilterValues(values)
	}

	useEffect(() => {
		contactStore.getContacts()
		groupStore.getGroups()
	}, [])

	return (
		<ContactListPageContent
			filteredContacts={filteredContacts}
			filter={filterValues}
			onSubmit={handleSubmit}
		/>
	)
})
