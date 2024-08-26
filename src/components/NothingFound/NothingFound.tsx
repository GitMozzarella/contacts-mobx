import { Illustration } from './Illustration'
import styles from './nothingFound.module.scss'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { messages } from '../../constants/messages'
import { PathList } from '../../router/PathList'

export const NothingFound = () => {
	const navigate = useNavigate()
	const [timer, setTimer] = useState(7)

	useEffect(() => {
		const interval = setInterval(() => {
			setTimer(prevTimer => prevTimer - 1)
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		if (timer === 0) {
			navigate(PathList.home)
		}
	}, [timer, navigate])

	return (
		<div className={styles.root}>
			<div className={styles.inner}>
				<Illustration className={styles.image} />
				<div className={styles.content}>
					<h2 className={styles.title}>{messages.notFound}</h2>
					<p className={styles.description}>{messages.description}</p>

					<button onClick={() => navigate('/')} className={styles.redirect}>
						{messages.redirectToHome}
					</button>

					<p className={styles.timerMessage}>
						{messages.timerMessage}
						<span className={styles.timer}>{timer}</span>
						{messages.seconds}
					</p>
				</div>
			</div>
		</div>
	)
}
