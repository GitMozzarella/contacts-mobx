import { memo, useCallback, useMemo } from 'react'
import { ContactDto } from 'src/types/dto/ContactDto'
import { FilterFormValues } from 'src/components/FilterForm/FilterForm'
import { setFilterValues } from 'src/redux/slices/contactsSlice'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { useGetContactsQuery } from 'src/redux/rtkQuery/contacts'
import { useGetGroupsQuery } from 'src/redux/rtkQuery/groups'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'
import { ContactListPageContent } from './ContactListPageContent'

export const ContactListPage = memo(() => {
	const dispatch = useAppDispatch()
	const { data: contacts = [], isLoading: contactsLoading } =
		useGetContactsQuery()
	const { data: groupContacts = [], isLoading: groupContactsLoading } =
		useGetGroupsQuery()

	const loading = contactsLoading || groupContactsLoading
	const filter = useAppSelector(state => state.contacts.filter)

	const applyFilters = useCallback(
		(
			contacts: ContactDto[],
			filter: Partial<FilterFormValues>,
			groupContacts: GroupContactsDto[]
		) => {
			return contacts.filter(contact => {
				const nameMatch =
					!filter.name ||
					contact.name.toLowerCase().includes(filter.name.toLowerCase())
				const groupMatch =
					!filter.groupId ||
					groupContacts
						.find(group => group.id === filter.groupId)
						?.contactIds.includes(contact.id)
				return nameMatch && groupMatch
			})
		},
		[]
	)

	const filteredContacts = useMemo(
		() => applyFilters(contacts, filter, groupContacts),
		[contacts, filter, groupContacts, applyFilters]
	)

	const onSubmit = (fv: Partial<FilterFormValues>) => {
		dispatch(setFilterValues(fv))
	}

	return (
		<ContactListPageContent
			loading={loading}
			filteredContacts={filteredContacts}
			filter={filter}
			onSubmit={onSubmit}
		/>
	)
})
