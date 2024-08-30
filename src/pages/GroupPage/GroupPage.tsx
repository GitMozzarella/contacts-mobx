import { useParams } from 'react-router-dom'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import { ContactCard } from 'src/components/ContactCard'
import styles from './groupPage.module.scss'
import { ErrorFetchContacts } from 'src/constants/errorMessages'
import { contactStore } from 'src/store/contactStore/contactStore'
import { groupStore } from 'src/store/groupStore/groupStore'
import { observer } from 'mobx-react-lite'

export const GroupPage = observer(() => {
	const { groupId } = useParams<{ groupId: string }>()

	const contactData = contactStore.contactsData
	const groupData = groupStore.groupsData

	const selectedGroup = groupData.find(group => group.id === groupId)
	const filteredContacts = selectedGroup
		? contactData.filter(contact =>
				selectedGroup.contactIds.includes(contact.id)
		  )
		: []

	return (
		<div className={styles.groupPage}>
			{selectedGroup ? (
				<>
					<div className={styles.groupContactsContainer}>
						<GroupContactsCard groupContactsId={selectedGroup.id} withLink />
					</div>
					<div className={styles.contactsContainer}>
						{filteredContacts.length === 0 ? (
							<p>{ErrorFetchContacts.NoContactsAvailable}</p>
						) : (
							filteredContacts.map(contact => (
								<div key={contact.id} className={styles.contactCard}>
									<ContactCard contact={contact} withLink />
								</div>
							))
						)}
					</div>
				</>
			) : (
				<p>{ErrorFetchContacts.NoContactsAvailable}</p>
			)}
		</div>
	)
})
