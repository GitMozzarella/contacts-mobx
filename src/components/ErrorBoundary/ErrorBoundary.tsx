import { Component, ReactNode, ErrorInfo } from 'react'
import { ErrorMessages } from '../../constants/errorMessages'
import { ErrorBoundaryProps, ErrorBoundaryState } from '../../types/common'

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = {
			hasError: false
		}
	}

	static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error(ErrorMessages.errorDidCatch, error.message)
		console.error(ErrorMessages.errorDidCatchInfo, errorInfo)
	}

	render(): ReactNode {
		if (this.state.hasError) {
			return <h3>{ErrorMessages.dataCatchError}</h3>
		}
		return this.props.children
	}
}

export default ErrorBoundary
