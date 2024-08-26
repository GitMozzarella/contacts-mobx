import { ErrorBoundary } from '../ErrorBoundary'
import { useLocation } from 'react-router-dom'
import { RouteWithErrorBoundaryProps } from '../../types/common'

export const RouteWithErrorBoundary: React.FC<RouteWithErrorBoundaryProps> = ({
	children
}): React.JSX.Element => {
	const location = useLocation()
	return <ErrorBoundary key={location?.pathname}>{children}</ErrorBoundary>
}
