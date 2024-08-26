import { Action } from 'redux'

export function logAction(action: Action) {
	console.log(action.type)
}
