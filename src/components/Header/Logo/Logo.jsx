import { Icon } from '../../Icon/Icon';
import { Link } from 'react-router-dom';
import style from './Logo.module.css';

export const Logo = () => (
	<Link className={style.logoContainer} to="/">
		<Icon id="fa-umbrella" size="70px" />
		<div>
			<div className={style.largeText}>Mагазин</div>
			<div className={style.smallText}>для всех,всех,всех</div>
		</div>
	</Link>
);
