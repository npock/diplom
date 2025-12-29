import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
	const navigate = useNavigate();

	return (
		<div
			style={{
				textAlign: 'center',
				marginTop: '100px',
				fontFamily: 'sans-serif',
			}}
		>
			<h1 style={{ fontSize: '72px', color: '#3b82f6' }}>404</h1>
			<h2>Упс! Похоже, эта рыба уплыла...</h2>
			<p>Страница, которую вы ищете, не существует.</p>
			<button
				onClick={() => navigate('/')}
				style={{
					padding: '10px 20px',
					backgroundColor: '#111827',
					color: 'white',
					border: 'none',
					borderRadius: '8px',
					cursor: 'pointer',
					marginTop: '20px',
				}}
			>
				Вернуться на главную
			</button>
		</div>
	);
};
