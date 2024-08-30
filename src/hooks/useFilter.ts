import { useState, useCallback, useEffect } from 'react'
import { FilterFormValues } from 'src/components/FilterForm/FilterForm'
import { ContactDto } from 'src/types/dto/ContactDto'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

export function useFilter(
	contacts: ContactDto[],
	groups: GroupContactsDto[],
	initialFilterValues: Partial<FilterFormValues>
) {
	const [filterValues, setFilterValues] =
		useState<Partial<FilterFormValues>>(initialFilterValues)
	const [filteredContacts, setFilteredContacts] =
		useState<ContactDto[]>(contacts)

	const applyFilters = useCallback(() => {
		let filtered = contacts

		if (filterValues.name) {
			const nameFilter = filterValues.name
			if (nameFilter) {
				filtered = filtered.filter(contact =>
					contact.name.toLowerCase().includes(nameFilter.toLowerCase())
				)
			}
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

	return {
		filterValues,
		setFilterValues,
		filteredContacts
	}
}
