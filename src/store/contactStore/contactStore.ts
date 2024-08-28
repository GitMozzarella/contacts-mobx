import { ContactDto } from 'src/types/dto/ContactDto'
import { api } from '../api/api'
import { isSuccessResponse, Response } from '../../types/response'
import { makeAutoObservable } from 'mobx'

export const contactStore = makeAutoObservable({
	contactsData: [] as ContactDto[],

	*getContacts() {
		const result: Response<ContactDto[]> = yield api.getContacts()

		if (isSuccessResponse(result)) {
			this.contactsData = result.data
		}
	}
})
