import { ContactDto } from 'src/types/dto/ContactDto'
import { Response, SuccessResponse, ErrorResponse } from '../../types/response'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'
import { BASE_URL, CONTACTS_URL, GROUPS_URL } from 'src/constants/variables'

class Api {
	async getContacts(): Promise<Response<ContactDto[]>> {
		const response = await this.fetch(BASE_URL + CONTACTS_URL)

		if (!response.ok) {
			const errorResponse: ErrorResponse = {
				success: false,
				error: `Error: ${response.statusText}`
			}
			return errorResponse
		}

		const data: ContactDto[] = await response.json()
		const successResponse: SuccessResponse<ContactDto[]> = {
			success: true,
			data
		}
		return successResponse
	}

	async getGroups(): Promise<Response<GroupContactsDto[]>> {
		const response = await this.fetch(BASE_URL + GROUPS_URL)

		if (!response.ok) {
			const errorResponse: ErrorResponse = {
				success: false,
				error: `Error: ${response.statusText}`
			}
			return errorResponse
		}

		const data: GroupContactsDto[] = await response.json()
		const successResponse: SuccessResponse<GroupContactsDto[]> = {
			success: true,
			data
		}
		return successResponse
	}

	async fetch(url: string, config?: RequestInit): Promise<globalThis.Response> {
		return fetch(url, config)
	}
}

export const api = new Api()
