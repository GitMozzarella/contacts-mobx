import { Provider } from 'react-redux'
import { store } from 'src/redux/store'
import { Router } from 'src/router'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'

export const MainApp = () => {
	return (
		<Provider store={store}>
			<MantineProvider>
				<ModalsProvider>
					<Notifications />
					<Router />
				</ModalsProvider>
			</MantineProvider>
		</Provider>
	)
}
