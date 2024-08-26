import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from 'src/components/MainLayout'
import { PathList } from './PathList'
import { HomePage } from 'src/pages/HomePage'
import { ContactListPage } from 'src/pages/ContactListPage'
import { ContactPage } from 'src/pages/ContactPage'
import { GroupListPage } from 'src/pages/GroupListPage'
import { GroupPage } from 'src/pages/GroupPage'
import { FavoriteListPage } from 'src/pages/FavoriteListPage'
import { NotFoundPage } from 'src/pages/NotFoundPage'

import { RouteWithErrorBoundary } from 'src/components/RouteWithErrorBoundary'

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={PathList.home} element={<MainLayout />}>
					<Route index element={<HomePage />} />
					<Route
						path={PathList.allContacts}
						element={
							<RouteWithErrorBoundary>
								<ContactListPage />
							</RouteWithErrorBoundary>
						}
					/>
					<Route
						path={PathList.contact}
						element={
							<RouteWithErrorBoundary>
								<ContactPage />
							</RouteWithErrorBoundary>
						}
					/>
					<Route
						path={PathList.allGroups}
						element={
							<RouteWithErrorBoundary>
								<GroupListPage />
							</RouteWithErrorBoundary>
						}
					/>
					<Route
						path={PathList.group}
						element={
							<RouteWithErrorBoundary>
								<GroupPage />
							</RouteWithErrorBoundary>
						}
					/>
					<Route
						path={PathList.favorite}
						element={
							<RouteWithErrorBoundary>
								<FavoriteListPage />
							</RouteWithErrorBoundary>
						}
					/>
					<Route
						path={PathList.notFound}
						element={
							<RouteWithErrorBoundary>
								<NotFoundPage />
							</RouteWithErrorBoundary>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
