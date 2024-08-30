export enum NavMenu {
	allContacts = 'Контакты',
	allGroups = 'Группы',
	favorites = 'Избранные'
}

export const EmptyList = 'Нет контактов'
export const EmptyListSearch = 'Контакт с таким именем не найден'
export const EmptyListFavorites = 'Нет избранных контактов'
export const ErrorFetchGroupsData = 'Error fetching groups data:'
export const ErrorFetchContactsData = 'Error fetching contacts data:'
export const FailedFetchGroupsData = 'Failed to fetch groups data'
export const FailedFetchContactsData = 'Failed to fetch contacts data'
export const GROUPS = 'groups'
export const CONTACTS = 'contacts'

export const FETCH_CONTACTS = 'contacts/fetchContactsFromFirestore'
export const FETCH_GROUP_CONTACTS = 'contacts/fetchGroupContactsFromFirestore'

export const ERROR = 'Error:'
export const NO_GROUPS = 'No groups found.'

export const ADD_CONTACT = 'contacts/addContact'
export const EDIT_CONTACT = 'contacts/editContact'
export const DELETE_CONTACT = 'contacts/deleteContact'

export const EMPTY_STRING = ''
export const NAME_STRING = 'name'

export const light_red = '#fdb2b2'
export const light_green = '#a1fca1'
export const red = 'red'
export const green = 'green'
export const blue = 'blue'

export const initialFormState = {
	name: EMPTY_STRING,
	phone: EMPTY_STRING,
	birthday: EMPTY_STRING,
	address: EMPTY_STRING,
	photo: EMPTY_STRING
}

export const initialFilterValues = { name: EMPTY_STRING, groupId: EMPTY_STRING }

export const BASE_URL =
	'https://fs04.gcfiles.net/fileservice/file/download/a/177331/sc'

export const CONTACTS_URL = '/385/h/0afc05779dcbbebd7055a1d87b8c7c6b.json'

export const GROUPS_URL = '/0/h/f1e98b0d70d16a909818b03b72415733.json'
