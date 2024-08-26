import { UseFormSetValue } from 'react-hook-form'
import { ContactDto } from 'src/types/dto/ContactDto'

// Валидация номера
export const handlePhoneChange = (
	event: React.ChangeEvent<HTMLInputElement>,
	setValue: UseFormSetValue<ContactDto>,
	trigger: (
		name: keyof ContactDto,
		options?: { shouldFocus: boolean }
	) => Promise<boolean>
) => {
	let value = event.currentTarget.value
	value = value.replace(/[^0-9]/g, '')
	if (value && !value.startsWith('+')) {
		value = `+${value}`
	}
	setValue('phone', value.slice(0, 13))
	trigger('phone', { shouldFocus: false })
}

export const validatePhone = (value: string) => {
	const isValid = /^\+\d{1,12}$/.test(value)
	return (
		isValid ||
		'Phone number must be in the format +<country code><up to 12 digits>'
	)
}

// Валидация даты
export const validateDate = (value: string) => {
	const isValidFormat = /^\d{2}\.\d{2}\.\d{4}$/.test(value)
	if (!isValidFormat) {
		return 'Birthday must be in the format DD.MM.YYYY'
	}

	const [day, month, year] = value.split('.').map(Number)
	const currentYear = new Date().getFullYear()

	if (year > currentYear) {
		return 'Year cannot be greater than the current year'
	}

	// Валидация месяца
	if (month < 1 || month > 12) {
		return 'Month must be between 01 and 12'
	}

	// Валидация дня
	const daysInMonth = new Date(year, month, 0).getDate()
	if (day < 1 || day > daysInMonth) {
		return 'Day must be valid for the given month'
	}

	return true
}

// Валидация имени
export const validateName = (value: string) => {
	const isValid = /^[A-Za-z]+( [A-Za-z]+)*$/.test(value)
	return (
		isValid ||
		'Name must only contain alphabetic characters and single spaces between words'
	)
}

// Валидация адреса
export const validateAddress = (value: string) => {
	const isValid = value.length >= 5
	return isValid || 'Address must be at least 5 characters long'
}
