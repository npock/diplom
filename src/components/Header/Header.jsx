import style from './Header.module.css';
import { Logo } from './Logo/Logo';
import { ControlPanel } from './ControlPanel/ControlPanel';

export const Header = () => (
	<header className={style.header}>
		<Logo />
		<div className={style.discription}>
			Здесь
			<br />
			есть
			<br />
			всё и ничего тоже есть
		</div>
		<ControlPanel />
	</header>
);
