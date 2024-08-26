import { Dispatch, ReactNode, SetStateAction } from 'react'

export type State<TState> = [TState, Dispatch<SetStateAction<TState>>]

export interface ErrorBoundaryProps {
	children: ReactNode
}

export interface ErrorBoundaryState {
	hasError: boolean
}

export interface RouteWithErrorBoundaryProps {
	children: React.ReactNode
}
