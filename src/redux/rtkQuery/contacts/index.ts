import { contactsApiSlice } from './slice'

export const contactsReducer = contactsApiSlice.reducer
export const contactsReducerPath = contactsApiSlice.reducerPath
export const contactsMiddleware = contactsApiSlice.middleware

export const {
	useGetContactsQuery,
	useCreateContactMutation,
	useDeleteContactMutation,
	useEditContactMutation
} = contactsApiSlice
