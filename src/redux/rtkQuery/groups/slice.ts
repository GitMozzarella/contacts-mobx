import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

const BASE_URL =
	'https://fs04.gcfiles.net/fileservice/file/download/a/177331/sc/0/h'

export const groupsApiSlice = createApi({
	reducerPath: 'groupsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL
	}),
	endpoints(builder) {
		return {
			getGroups: builder.query<GroupContactsDto[], void>({
				query: () => ({ url: '/f1e98b0d70d16a909818b03b72415733.json' })
			})
		}
	}
})
