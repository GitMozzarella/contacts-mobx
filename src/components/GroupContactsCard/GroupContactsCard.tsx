import { memo } from 'react'
import { useGetGroupsQuery } from 'src/redux/rtkQuery/groups'
import { ErrorFetchGroups } from 'src/constants/errorMessages'
import { Loading } from '../Loading/Loading'

import styles from './groupContactsCard.module.scss'
import { GroupContactsCardContent } from './GroupContactsCardContent'

interface GroupContactsCardProps {
	groupContactsId: string
	withLink?: boolean
}

export const GroupContactsCard = memo<GroupContactsCardProps>(
	({ groupContactsId, withLink }) => {
		const { data: groupContacts, isLoading, isError } = useGetGroupsQuery()

		if (isLoading)
			return (
				<div className={styles.loader}>
					<Loading />
				</div>
			)

		if (isError)
			return (
				<div className={styles.error}>{ErrorFetchGroups.FailedLoadGroups}</div>
			)

		if (!groupContacts || groupContacts.length === 0)
			return (
				<div className={styles.noGroups}>
					{ErrorFetchGroups.NoGroupsAvailable}
				</div>
			)

		const selectedGroup = groupContacts.find(
			group => group.id === groupContactsId
		)

		if (!selectedGroup)
			return (
				<div className={styles.groupNotFound}>
					{ErrorFetchGroups.GroupNotFound}
				</div>
			)

		return (
			<GroupContactsCardContent
				selectedGroup={selectedGroup}
				withLink={withLink}
			/>
		)
	}
)
