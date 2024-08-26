import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { contactsReducer } from './slices/contactsSlice'
import { contactsApiSlice } from './rtkQuery/contacts/slice'
import { logActionMiddleware } from './logActionMiddleware'
import { groupsApiSlice } from './rtkQuery/groups/slice'

const RootReducer = combineReducers({
	contacts: contactsReducer,
	[contactsApiSlice.reducerPath]: contactsApiSlice.reducer,
	[groupsApiSlice.reducerPath]: groupsApiSlice.reducer
})

export const store = configureStore({
	reducer: RootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			contactsApiSlice.middleware,
			groupsApiSlice.middleware,
			logActionMiddleware
		)
})

export type RootState = ReturnType<typeof RootReducer>
export type AppDispatch = typeof store.dispatch
