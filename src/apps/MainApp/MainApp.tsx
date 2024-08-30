import { Router } from 'src/router'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'

export const MainApp = () => {
	return (
		<MantineProvider>
			<ModalsProvider>
				<Notifications />
				<Router />
			</ModalsProvider>
		</MantineProvider>
	)
}
