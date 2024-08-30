import { ContactDto } from 'src/types/dto/ContactDto'
import { Response, SuccessResponse, ErrorResponse } from '../../types/response'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

class Api {
	async getContacts(): Promise<Response<ContactDto[]>> {
		const response = await this.fetch(
			'https://fs04.gcfiles.net/fileservice/file/download/a/177331/sc/385/h/0afc05779dcbbebd7055a1d87b8c7c6b.json'
		)

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
		const response = await this.fetch(
			'https://fs04.gcfiles.net/fileservice/file/download/a/177331/sc/0/h/f1e98b0d70d16a909818b03b72415733.json'
		)

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
