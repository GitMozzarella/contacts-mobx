import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUserEdit } from 'react-icons/fa'
import { MdDeleteForever, MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { FcHome, FcPhone, FcCalendar } from 'react-icons/fc'
import { openConfirmModal } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { AddContactModal } from '../AddContactModal/AddContactModal'
import { messages } from 'src/constants/messages'
import { observer } from 'mobx-react-lite'
import styles from './contactCard.module.scss'
import { contactStore } from 'src/store/contactStore/contactStore'

import { ContactDto } from 'src/types/dto/ContactDto'
import {
	blue,
	green,
	light_green,
	light_red,
	red
} from 'src/constants/variables'
import { ErrorMessages } from 'src/constants/errorMessages'
import { favoritesStore } from 'src/store/favoriteStore/favoriteStore'

interface ContactCardProps {
	contact: ContactDto
	withLink?: boolean
}

const ContactCardComponent = ({ contact, withLink }: ContactCardProps) => {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const isFavorite = favoritesStore.isFavorite(contact.id)

	const handleToggleFavorite = () => {
		favoritesStore.toggleFavoriteContact(contact.id)
		notifications.show({
			title: messages.notification,
			message: isFavorite
				? `${contact.name} ${messages.deletedFromFav}`
				: `${contact.name} ${messages.addToFav}`,
			color: isFavorite ? red : green,
			autoClose: 2500,
			styles: {
				root: {
					backgroundColor: isFavorite ? light_red : light_green
				}
			}
		})
	}

	const handleDelete = () => {
		if (!contact.id) {
			notifications.show({
				title: messages.error,
				message: messages.notFoundForDelete,
				color: red,
				autoClose: 5000
			})
			return
		}

		openConfirmModal({
			title: messages.deleteProcess,
			children: (
				<p>
					{messages.confirmMessage} {contact.name}?
				</p>
			),
			labels: { confirm: messages.delete, cancel: messages.reject },
			confirmProps: { color: blue },
			onConfirm: async () => {
				try {
					contactStore.deleteContact(contact.id)

					notifications.show({
						title: messages.notification,
						message: messages.confirmDelete,
						limit: 5,
						position: 'top-center'
					})
				} catch (error) {
					console.error(ErrorMessages.ErrorDeletingContact, error)

					contactStore.createContact(contact)

					notifications.show({
						title: messages.error,
						message: ErrorMessages.ErrorDelete,
						color: red,
						autoClose: 5000
					})
				}
			}
		})
	}

	const handleEdit = () => {
		setIsEditModalOpen(true)
	}

	return (
		<div className={styles.card}>
			<img className={styles.cardImg} src={contact.photo} alt={contact.name} />
			<div className={styles.cardBody}>
				<div className={styles.cardTitle}>
					{withLink ? (
						<Link to={`/contacts/${contact.id}`}>{contact.name}</Link>
					) : (
						contact.name
					)}
				</div>
				<div className={styles.cardBody}>
					<ul className={styles.listGroup}>
						<li className={styles.listGroupItem}>
							<FcPhone />
							{'   '}
							<Link
								className={styles.phone}
								to={`tel:${contact.phone}`}
								target='_blank'
							>
								{contact.phone}
							</Link>
						</li>
						<li className={styles.listGroupItem}>
							<FcCalendar /> {'   '} {contact.birthday}
						</li>
						<li className={styles.listGroupItem}>
							<FcHome /> {'   '} {contact.address}
						</li>
					</ul>
				</div>
			</div>
			<div className={styles.buttonsContainer}>
				<button onClick={handleToggleFavorite}>
					{isFavorite ? (
						<MdFavorite className={styles.buttonFavorite} />
					) : (
						<MdFavoriteBorder className={styles.buttonFavorite} />
					)}
				</button>
				<button onClick={handleEdit}>
					<FaUserEdit className={styles.buttonUser} />
				</button>
				<button onClick={handleDelete}>
					<MdDeleteForever className={styles.buttonUser} />
				</button>
			</div>
			{isEditModalOpen && (
				<AddContactModal
					isOpen={isEditModalOpen}
					onClose={() => setIsEditModalOpen(false)}
					initialData={contact}
				/>
			)}
		</div>
	)
}

export const ContactCard = memo(observer(ContactCardComponent))
