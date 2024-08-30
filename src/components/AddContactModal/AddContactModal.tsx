import React, { useEffect } from 'react'
import { Modal, Button, TextInput } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { ContactDto } from 'src/types/dto/ContactDto'

import { Loading } from 'src/components/Loading'
import { v4 as uuidv4 } from 'uuid'
import styles from './index.module.scss'
import {
	handlePhoneChange,
	validatePhone,
	validateDate,
	validateName,
	validateAddress
} from 'src/utils/validate'
import { initialFormState, NAME_STRING } from 'src/constants/variables'
import { messages } from 'src/constants/messages'
import { contactStore } from 'src/store/contactStore/contactStore'

interface AddContactModalProps {
	isOpen: boolean
	onClose: () => void
	initialData?: ContactDto
}

export const AddContactModal: React.FC<AddContactModalProps> = ({
	isOpen,
	onClose,
	initialData
}) => {
	const {
		register,
		handleSubmit,
		setValue,
		trigger,
		reset,
		formState: { errors }
	} = useForm<ContactDto>({
		defaultValues: initialFormState,
		mode: 'onChange'
	})

	useEffect(() => {
		if (initialData) {
			reset(initialData)
		} else {
			reset(initialFormState)
		}
	}, [initialData, reset, isOpen])

	const onSubmit = async (values: Omit<ContactDto, 'id'>) => {
		try {
			if (initialData) {
				contactStore.updateContact(initialData.id, values)
			} else {
				const newContact: ContactDto = { id: uuidv4(), ...values }
				contactStore.createContact(newContact)
			}
			onClose()
		} catch (err) {
			console.error('Operation failed:', err)
		}
	}

	const handleChange = (
		fieldName: keyof ContactDto,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = event.target.value
		const correctedValue =
			fieldName === NAME_STRING
				? value.charAt(0).toUpperCase() + value.slice(1)
				: value

		setValue(fieldName, correctedValue, { shouldValidate: true })
		trigger(fieldName, { shouldFocus: false })
	}

	return (
		<Modal
			opened={isOpen}
			onClose={onClose}
			title={initialData ? messages.editContact : messages.addContact}
			classNames={{ title: styles.modalTitle }}
		>
			{false && <Loading />}{' '}
			{/* Здесь можно добавить логику для показа загрузки */}
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<TextInput
					label='Имя'
					placeholder='John Wick'
					{...register('name', { validate: validateName })}
					onChange={e => handleChange('name', e)}
					error={errors.name?.message}
					className={styles.textInput}
				/>
				<TextInput
					label='Телефон'
					placeholder='+8982474523553'
					{...register('phone', {
						validate: validatePhone,
						onChange: e => handlePhoneChange(e, setValue, trigger)
					})}
					error={errors.phone?.message}
					className={styles.textInput}
				/>
				<TextInput
					label='День рождения'
					placeholder='21.05.1995'
					{...register('birthday', { validate: validateDate })}
					onChange={e => handleChange('birthday', e)}
					error={errors.birthday?.message}
					className={styles.textInput}
				/>
				<TextInput
					label='Адрес'
					placeholder='Lenin’s Avenue'
					{...register('address', { validate: validateAddress })}
					onChange={e => handleChange('address', e)}
					error={errors.address?.message}
					className={styles.textInput}
				/>
				<TextInput
					label='Фото URL'
					placeholder='Enter photo URL'
					{...register('photo', { required: 'URL фото обязателен' })}
					onChange={e => handleChange('photo', e)}
					error={errors.photo?.message}
					className={styles.textInput}
				/>
				<Button type='submit' className={styles.button}>
					{initialData ? messages.save : messages.add}
				</Button>
			</form>
		</Modal>
	)
}
