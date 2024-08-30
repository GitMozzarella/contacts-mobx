import { observer } from 'mobx-react-lite'
import { groupStore } from 'src/store/groupStore/groupStore'
import styles from './groupContactsCard.module.scss'
import { GroupContactsCardContent } from './GroupContactsCardContent'

interface GroupContactsCardProps {
	groupContactsId: string
	withLink?: boolean
}

export const GroupContactsCard = observer(
	({ groupContactsId, withLink }: GroupContactsCardProps) => {
		const { groupsData } = groupStore

		const selectedGroup = groupsData.find(group => group.id === groupContactsId)

		if (!selectedGroup) {
			return <div className={styles.groupNotFound}>Group not found</div>
		}

		return (
			<GroupContactsCardContent
				selectedGroup={selectedGroup}
				withLink={withLink}
			/>
		)
	}
)
