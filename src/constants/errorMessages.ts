export enum ErrorMessages {
	error = 'Error',
	dataCatchError = 'Ошибка получения данных',
	errorDidCatch = 'Сообщение об ошибке',
	errorDidCatchInfo = 'Что-то пошло не так!',
	ErrorAuth = 'Ошибка авторизации',
	ErrorDeletingContact = 'Error deleting contact:',
	ErrorDelete = 'Не удалось удалить контакт. Попробуйте еще раз.'
}

export enum ErrorFetchGroups {
	FailedLoadGroups = 'Не удалось загрузить группы',
	NoGroupsAvailable = 'Нет доступных групп',
	GroupNotFound = 'Группа не найдена'
}

export enum ErrorFetchContacts {
	NoContactsAvailable = 'Нет доступных контактов'
}
