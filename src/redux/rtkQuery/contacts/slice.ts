import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ContactDto } from 'src/types/dto/ContactDto'

export const contactsApiSlice = createApi({
	reducerPath: 'contactsApi',
	baseQuery: fetchBaseQuery({
		baseUrl:
			'https://fs04.gcfiles.net/fileservice/file/download/a/177331/sc/385/h'
	}),
	tagTypes: ['contacts'],
	endpoints(builder) {
		return {
			//Получение контактов
			getContacts: builder.query<ContactDto[], void>({
				query: () => ({ url: '/0afc05779dcbbebd7055a1d87b8c7c6b.json' }),
				providesTags: ['contacts']
			}),
			createContact: builder.mutation<void, ContactDto>({
				//добавление нового контакта
				query: newContact => ({
					url: '/contacts',
					method: 'POST',
					body: newContact
				}),
				invalidatesTags: ['contacts']
			}),
			editContact: builder.mutation<ContactDto, ContactDto>({
				//редактирование контакта
				query(contact: ContactDto) {
					return {
						url: `/contacts/${contact.id}`,
						method: 'PATCH',
						body: contact
					}
				},
				invalidatesTags: ['contacts']
			}),

			deleteContact: builder.mutation<ContactDto[], ContactDto['id']>({
				//удаление контакта
				query(contactId) {
					return {
						url: `/${contactId}`,
						method: 'DELETE'
					}
				},
				invalidatesTags: ['contacts']
			})
		}
	}
})
