import { memo } from 'react'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import styles from './groupListPage.module.scss'
import { Loading } from 'src/components/Loading/Loading'
import { NO_GROUPS } from 'src/constants/variables'
import { useGetGroupsQuery } from 'src/redux/rtkQuery/groups'

export const GroupListPage = memo(() => {
	const { data: groupContacts, isLoading } = useGetGroupsQuery()

	return (
		<div className={styles.groupList}>
			{isLoading ? (
				<div className={styles.loader}>
					<Loading />
				</div>
			) : groupContacts && groupContacts.length === 0 ? (
				<p>{NO_GROUPS}</p>
			) : (
				groupContacts?.map(group => (
					<div key={group.id} className={styles.groupItem}>
						<GroupContactsCard groupContactsId={group.id} withLink />
					</div>
				))
			)}
		</div>
	)
})
