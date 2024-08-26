import { groupsApiSlice } from './slice'

export const groupsReducer = groupsApiSlice.reducer
export const groupsReducerPath = groupsApiSlice.reducerPath
export const groupsMiddleware = groupsApiSlice.middleware

export const { useGetGroupsQuery } = groupsApiSlice
