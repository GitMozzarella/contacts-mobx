import React, { memo, useState, useEffect } from 'react'
import { debounce } from 'lodash'
import { MdPersonSearch, MdClear } from 'react-icons/md'
import { IoPersonAdd } from 'react-icons/io5'
import { setFilterValues } from 'src/redux/slices/contactsSlice'
import styles from './filterForm.module.scss'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { AddContactModal } from '../AddContactModal/AddContactModal'
import { EMPTY_STRING, initialFilterValues } from 'src/constants/variables'

import { Loading } from '../Loading/Loading'
import { useGetGroupsQuery } from 'src/redux/rtkQuery/groups'

export interface FilterFormValues {
	name: string
	groupId: string
}

interface FilterFormProps {
	initialValues?: Partial<FilterFormValues>
	onSubmit: (values: Partial<FilterFormValues>) => void
}

export const FilterForm = memo(
	({ initialValues = initialFilterValues, onSubmit }: FilterFormProps) => {
		const dispatch = useAppDispatch()
		const { data: groupContactsList = [], isLoading } = useGetGroupsQuery()
		const filterValues = useAppSelector(state => state.contacts.filter)

		const [values, setValues] = useState<FilterFormValues>({
			name: initialValues.name || filterValues.name || EMPTY_STRING,
			groupId: initialValues.groupId || filterValues.groupId || EMPTY_STRING
		})

		const [isModalOpen, setIsModalOpen] = useState(false)

		useEffect(() => {
			const debouncedSubmit = debounce((updatedValues: FilterFormValues) => {
				onSubmit(updatedValues)
				dispatch(setFilterValues(updatedValues))
			}, 300)

			debouncedSubmit(values)

			return () => {
				debouncedSubmit.cancel()
			}
		}, [values, dispatch, onSubmit])

		const handleChange = (
			e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
		) => {
			const { name, value } = e.target
			setValues(prevValues => ({
				...prevValues,
				[name]: value
			}))
		}

		const handleClear = () => {
			setValues(initialFilterValues)
			dispatch(setFilterValues(initialFilterValues))
		}

		if (isLoading) {
			return (
				<div className={styles.loader}>
					<Loading />
				</div>
			)
		}

		return (
			<form className={styles.filterForm} onSubmit={e => e.preventDefault()}>
				<div className={styles.formInput}>
					<div className={styles.inputContainer}>
						<input
							type='text'
							id='name'
							name='name'
							placeholder='Search contact...'
							aria-label='Name'
							value={values.name}
							onChange={handleChange}
						/>
						<MdPersonSearch className={styles.icon} />
						{values.name && (
							<MdClear className={styles.clear} onClick={handleClear} />
						)}
					</div>
				</div>
				<div className={styles.formSelect}>
					<select
						id='groupId'
						name='groupId'
						aria-label='Search by group'
						value={values.groupId}
						onChange={handleChange}
					>
						<option value=''>Select a group</option>
						{groupContactsList.map(groupContacts => (
							<option value={groupContacts.id} key={groupContacts.id}>
								{groupContacts.name}
							</option>
						))}
					</select>
				</div>
				<div className={styles.buttonsContainer}>
					<button
						className={styles.buttonAdd}
						type='button'
						onClick={() => setIsModalOpen(true)}
					>
						<IoPersonAdd />
					</button>
				</div>
				<AddContactModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				/>
			</form>
		)
	}
)
