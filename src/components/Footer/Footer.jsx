import { Weather } from './components/Weather';
import style from './Footer.module.css';

export const Footer = () => {
	return (
		<div className={style.footer}>
			<div>
				<div>магазин</div>
				<div>web@shop.ru</div>
			</div>
			<div>
				<div></div>
				<div></div>
			</div>
			<Weather />
		</div>
	);
};
