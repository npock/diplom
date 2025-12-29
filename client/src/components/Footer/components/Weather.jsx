import { useEffect, useState } from 'react';
import styles from './Weather.module.css'; // Импорт стилей

export const Weather = () => {
	const [weather, setWeather] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const fetchWeather = async () => {
		setIsLoading(true);
		try {
			const res = await fetch(
				'https://api.openweathermap.org/data/2.5/weather?q=Voronezh&units=metric&lang=ru&appid=7ba89d2e23e99ac79b92616d20476811',
			);
			if (!res.ok) throw new Error();
			const data = await res.json();
			setWeather(data);
		} catch (error) {
			console.log(error);
			setError('Ошибка погоды');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchWeather();
	}, []);

	if (isLoading)
		return <div className={styles.weatherContainer}>Загрузка...</div>;
	if (error || !weather) return null; // Если ошибка, лучше просто скрыть виджет

	return (
		<div className={styles.weatherContainer}>
			<div className={styles.date}>
				{new Date().toLocaleString('ru', {
					day: 'numeric',
					month: 'long',
				})}
			</div>
			<div className={styles.city}>{weather.name}</div>
			<div className={styles.temp}>{Math.round(weather.main.temp)}°C</div>
			<div className={styles.description}>
				{weather.weather[0]?.description}
			</div>
			<div style={{ fontSize: '11px', opacity: 0.7 }}>
				Влажность: {weather.main.humidity}%
			</div>
		</div>
	);
};
