import { Middleware } from 'redux'
import { logAction } from '../metrics/logAction'
import { RootState } from './store'

export const logActionMiddleware: Middleware<{}, RootState> =
	storeAPI => next => action => {
		logAction(action as any)
		return next(action)
	}
