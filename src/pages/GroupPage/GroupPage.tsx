import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import { ContactCard } from 'src/components/ContactCard'
import styles from './groupPage.module.scss'
import { useGetGroupsQuery } from 'src/redux/rtkQuery/groups'
import { useGetContactsQuery } from 'src/redux/rtkQuery/contacts'
import { ErrorFetchContacts } from 'src/constants/errorMessages'
import { Loading } from 'src/components/Loading'

export const GroupPage = memo(() => {
	const { groupId } = useParams<{ groupId: string }>()

	const { data: groupContacts = [], isLoading: isGroupsLoading } =
		useGetGroupsQuery()
	const { data: contacts = [], isLoading: isContactsLoading } =
		useGetContactsQuery()

	const isLoading = isGroupsLoading || isContactsLoading

	const selectedGroup = groupContacts.find(group => group.id === groupId)
	const filteredContacts = selectedGroup
		? contacts.filter(contact => selectedGroup.contactIds.includes(contact.id))
		: []

	return (
		<div className={styles.groupPage}>
			{isLoading ? (
				<div>
					<Loading />
				</div>
			) : (
				<>
					{selectedGroup && (
						<div className={styles.groupContactsContainer}>
							<GroupContactsCard groupContactsId={selectedGroup.id} withLink />
						</div>
					)}
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
			)}
		</div>
	)
})
