import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ContactDto } from 'src/types/dto/ContactDto'

import { FilterFormValues } from 'src/components/FilterForm/FilterForm'
import { contactsApiSlice } from '../rtkQuery/contacts/slice'

interface ContactsState {
	contacts: ContactDto[]

	filter: Partial<FilterFormValues>
	loading: boolean
	error: string | null
	favoriteContacts: string[]
}

const initialState: ContactsState = {
	contacts: [],

	filter: {},
	loading: false,
	error: null,
	favoriteContacts: []
}

const contactsSlice = createSlice({
	name: 'contacts',
	initialState,
	reducers: {
		setFilterValues(state, action: PayloadAction<Partial<FilterFormValues>>) {
			state.filter = action.payload
		},

		toggleFavoriteContact(state, action: PayloadAction<string>) {
			const contactId = action.payload
			const favoriteSet = new Set(state.favoriteContacts)
			if (favoriteSet.has(contactId)) {
				favoriteSet.delete(contactId)
			} else {
				favoriteSet.add(contactId)
			}
			state.favoriteContacts = Array.from(favoriteSet)
		}
	},
	extraReducers: builder => {
		builder
			.addMatcher(
				contactsApiSlice.endpoints.getContacts.matchPending,
				state => {
					state.loading = true
					state.error = null
				}
			)
			.addMatcher(
				contactsApiSlice.endpoints.getContacts.matchFulfilled,
				(state, action: PayloadAction<ContactDto[]>) => {
					state.contacts = action.payload
					state.loading = false
				}
			)
			.addMatcher(
				contactsApiSlice.endpoints.getContacts.matchRejected,
				(state, action) => {
					if (action.payload) {
						state.error =
							(action.payload.data as string) || 'Unknown error occurred'
					} else {
						state.error = 'An error occurred'
					}
					state.loading = false
				}
			)
	}
})

export const { setFilterValues, toggleFavoriteContact } = contactsSlice.actions

export const contactsReducer = contactsSlice.reducer
