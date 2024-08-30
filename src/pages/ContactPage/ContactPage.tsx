import { useEffect } from 'react'
import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FcHome, FcPhone, FcCalendar } from 'react-icons/fc'
import styles from './contactPage.module.scss'
import { EmptyContactsList } from 'src/components/EmptyContactsList'
import { contactStore } from 'src/store/contactStore/contactStore'
import { observer } from 'mobx-react-lite'

export const ContactPage: FC = observer(() => {
	const { contactId } = useParams<{ contactId: string }>()

	useEffect(() => {
		if (contactStore.contactsData.length === 0) {
			contactStore.getContacts()
		}
	}, [])

	const { contactsData } = contactStore
	const contact = contactsData.find(({ id }) => id === contactId)

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{contact ? (
					<div className={styles.cardContact}>
						<div className={styles.photoContact}>
							<img
								className={styles.cardImg}
								src={contact.photo}
								alt={contact.name}
							/>
							<h2>{contact.name}</h2>
						</div>
						<div className={styles.infoContact}>
							<ul className={styles.listGroup}>
								<li className={styles.listGroupItem}>
									<strong>
										<FcPhone />
									</strong>
									<Link
										className={styles.phone}
										to={`tel:${contact.phone}`}
										target='_blank'
									>
										{contact.phone}
									</Link>
								</li>
								<li className={styles.listGroupItem}>
									<strong>
										<FcCalendar />
									</strong>
									{contact.birthday}
								</li>
								<li className={styles.listGroupItem}>
									<strong>
										<FcHome />
									</strong>
									{contact.address}
								</li>
							</ul>
						</div>
					</div>
				) : (
					<EmptyContactsList />
				)}
			</div>
		</div>
	)
})
