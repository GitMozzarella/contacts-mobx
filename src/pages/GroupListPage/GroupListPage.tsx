import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import styles from './groupListPage.module.scss'
import { Loading } from 'src/components/Loading/Loading'
import { NO_GROUPS } from 'src/constants/variables'
import { groupStore } from 'src/store/groupStore/groupStore'

export const GroupListPage = observer(() => {
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (groupStore.groupsData.length === 0) {
			const fetchGroups = async () => {
				try {
					setIsLoading(true)
					await groupStore.getGroups()
				} catch (e) {
					setError('Ошибка загрузки групп')
				} finally {
					setIsLoading(false)
				}
			}

			fetchGroups()
		} else {
			setIsLoading(false)
		}
	}, [])

	const groupData = groupStore.groupsData

	return (
		<div className={styles.groupList}>
			{isLoading ? (
				<div className={styles.loader}>
					<Loading />
				</div>
			) : error ? (
				<p className={styles.error}>{error}</p>
			) : groupData.length === 0 ? (
				<p>{NO_GROUPS}</p>
			) : (
				groupData.map(group => (
					<div key={group.id} className={styles.groupItem}>
						<GroupContactsCard groupContactsId={group.id} withLink />
					</div>
				))
			)}
		</div>
	)
})
