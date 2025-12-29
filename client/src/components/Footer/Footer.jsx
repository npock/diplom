import { Weather } from './components/Weather';
import style from './Footer.module.css';

export const Footer = () => {
	return (
		<footer className={style.footer}>
			<div>
				<div className={style.blueTitle}>МАГАЗИН</div>
				<div className={style.email}>web@shop.ru</div>
			</div>

			<div>
				<div></div>
				<div></div>
			</div>

			<div className={style.weatherWrapper}>
				<Weather />
			</div>
		</footer>
	);
};
