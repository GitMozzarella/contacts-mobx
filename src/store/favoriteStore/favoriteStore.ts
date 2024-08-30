import { makeAutoObservable } from 'mobx'

class FavoritesStore {
	favoriteContacts: string[] = []

	constructor() {
		makeAutoObservable(this)
	}

	toggleFavoriteContact(contactId: string) {
		if (this.favoriteContacts.includes(contactId)) {
			this.favoriteContacts = this.favoriteContacts.filter(
				id => id !== contactId
			)
		} else {
			this.favoriteContacts.push(contactId)
		}
	}

	isFavorite(contactId: string) {
		return this.favoriteContacts.includes(contactId)
	}
}

export const favoritesStore = new FavoritesStore()
