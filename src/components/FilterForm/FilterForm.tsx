import React, { useState, useEffect } from 'react'
import { debounce } from 'lodash'
import { MdPersonSearch, MdClear } from 'react-icons/md'
import { IoPersonAdd } from 'react-icons/io5'
import { observer } from 'mobx-react-lite'
import styles from './filterForm.module.scss'
import { AddContactModal } from '../AddContactModal/AddContactModal'
import { EMPTY_STRING, initialFilterValues } from 'src/constants/variables'
import { groupStore } from 'src/store/groupStore/groupStore'

export interface FilterFormValues {
	name: string
	groupId: string
}

interface FilterFormProps {
	initialValues?: Partial<FilterFormValues>
	onSubmit: (values: Partial<FilterFormValues>) => void
}

export const FilterForm = observer(
	({ initialValues = initialFilterValues, onSubmit }: FilterFormProps) => {
		const { groupsData } = groupStore

		const [values, setValues] = useState<FilterFormValues>({
			name: initialValues.name || EMPTY_STRING,
			groupId: initialValues.groupId || EMPTY_STRING
		})

		const [isModalOpen, setIsModalOpen] = useState(false)

		useEffect(() => {
			const debouncedSubmit = debounce((updatedValues: FilterFormValues) => {
				onSubmit(updatedValues)
			}, 300)

			debouncedSubmit(values)

			return () => {
				debouncedSubmit.cancel()
			}
		}, [values, onSubmit])

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
			onSubmit(initialFilterValues)
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
						{groupsData.map(group => (
							<option value={group.id} key={group.id}>
								{group.name}
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
