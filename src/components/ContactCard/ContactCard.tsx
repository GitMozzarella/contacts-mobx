import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { FaUserEdit } from 'react-icons/fa'
import { MdDeleteForever, MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { FcHome, FcPhone, FcCalendar } from 'react-icons/fc'
import { openConfirmModal } from '@mantine/modals'
import { toggleFavoriteContact } from 'src/redux/slices/contactsSlice'
import { ContactDto } from 'src/types/dto/ContactDto'
import styles from './contactCard.module.scss'
import { notifications } from '@mantine/notifications'
import { AddContactModal } from '../AddContactModal/AddContactModal'
import { messages } from 'src/constants/messages'
import {
	blue,
	green,
	light_green,
	light_red,
	red
} from 'src/constants/variables'
import { ErrorMessages } from 'src/constants/errorMessages'
import {
	useCreateContactMutation,
	useDeleteContactMutation
} from 'src/redux/rtkQuery/contacts'

interface ContactCardProps {
	contact: ContactDto
	withLink?: boolean
}

export const ContactCard = memo<ContactCardProps>(({ contact, withLink }) => {
	const dispatch = useAppDispatch()
	const favoriteContacts = useAppSelector(
		state => state.contacts.favoriteContacts
	)
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)

	const isFavorite = favoriteContacts.includes(contact.id)
	const [deleteContact] = useDeleteContactMutation()

	const [createContact] = useCreateContactMutation()

	const handleToggleFavorite = () => {
		dispatch(toggleFavoriteContact(contact.id))
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
					await deleteContact(contact.id).unwrap()

					notifications.show({
						title: messages.notification,
						message: messages.confirmDelete,
						limit: 5,
						position: 'top-center'
					})
				} catch (error) {
					console.error(ErrorMessages.ErrorDeletingContact, error)

					await createContact(contact)

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
})
