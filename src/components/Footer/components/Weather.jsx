import { useEffect, useState } from 'react';

export const Weather = () => {
	const [weather, setWeather] = useState({ name: '', main: {}, weather: [] });
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const fetchWeather = async () => {
		setIsLoading(true);
		try {
			const res = await fetch(
				'https://api.openweathermap.org/data/2.5/weather?q=Voronezh&units=metric&lang=ru&appid=7ba89d2e23e99ac79b92616d20476811',
			);
			const { name, main, weather } = await res.json();
			setWeather({ name, main, weather });
			setIsLoading(false);
		} catch (error) {
			setError(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchWeather();
	}, []);

	if (isLoading) {
		return <>loading...</>;
	}
	if (error) {
		return <>{error}</>;
	}
	return (
		<>
			{' '}
			<div>
				{new Date().toLocaleString('ru', {
					day: 'numeric',
					month: 'long',
				})}
				<br />
				{weather.name}
				<br />
				{weather.weather[0]?.description}
				<br />
				влажность:{weather.main.humidity}
				<br />
				температура:{Math.round(weather.main.temp)}
			</div>
		</>
	);
};
