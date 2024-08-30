import { ContactDto } from 'src/types/dto/ContactDto'
import { api } from '../api/api'
import { isSuccessResponse, Response } from '../../types/response'
import { makeAutoObservable } from 'mobx'
import { v4 as uuidv4 } from 'uuid'

export const contactStore = makeAutoObservable({
	contactsData: [] as ContactDto[],

	*getContacts() {
		const result: Response<ContactDto[]> = yield api.getContacts()

		if (isSuccessResponse(result)) {
			this.contactsData = result.data
		}
	},

	// Заглушка для добавления контакта
	createContact(contact: Omit<ContactDto, 'id'>) {
		const newContact: ContactDto = { id: uuidv4(), ...contact }
		this.contactsData.push(newContact)
	},

	// Заглушка для обновления контакта
	updateContact(id: string, updatedData: Partial<ContactDto>) {
		this.contactsData = this.contactsData.map(contact =>
			contact.id === id ? { ...contact, ...updatedData } : contact
		)
	},

	// Заглушка для удаления контакта
	deleteContact(id: string) {
		this.contactsData = this.contactsData.filter(contact => contact.id !== id)
	}
})
