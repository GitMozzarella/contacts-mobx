import { ContactDto } from 'src/types/dto/ContactDto'

export interface ContactStore {
	contactsData: ContactDto[]
	getContacts: () => void
	createContact: (contact: Omit<ContactDto, 'id'>) => void
	updateContact: (id: string, updatedData: Partial<ContactDto>) => void
	deleteContact: (id: string) => void
}
