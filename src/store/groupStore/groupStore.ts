import { api } from '../api/api'
import { isSuccessResponse, Response } from '../../types/response'
import { makeAutoObservable } from 'mobx'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

export const groupStore = makeAutoObservable({
	groupsData: [] as GroupContactsDto[],

	*getGroups() {
		const result: Response<GroupContactsDto[]> = yield api.getGroups()

		if (isSuccessResponse(result)) {
			this.groupsData = result.data
		}
	}
})
