import { Icon } from '../../Icon/Icon';
import { Link, useNavigate } from 'react-router-dom';
import style from './ControlPanel.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { ROLE } from '../../../bff/constants/role';
import { logoutUser } from '../../../store/actions/logout';

export const ControlPanel = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userRoleId = useSelector((state) => state.user.authUser.roleId);
	const userLogin = useSelector((state) => state.user.authUser.name);
	const userSession = useSelector((state) => state.user.authUser.session);
	// const user = useSelector((state) => state.user.authUser);

	const signOut = () => {
		// localStorage.clear();

		dispatch(logoutUser(userSession));
	};
	return (
		<div className={style.ControlPanelContainer}>
			{userRoleId === ROLE.GUEST ? (
				<Link className={style.ButttonSign} to="/login">
					sign in
				</Link>
			) : (
				<>
					<div>{userLogin}</div>
					<div className={style.buttonLogout} onClick={signOut}>
						<Icon id="fa-sign-out" margin="10px 0 0 0" />
					</div>
				</>
			)}

			<div className={style.rightAlign}>
				<div className={style.buttonBack} onClick={() => navigate(-1)}>
					<Icon id="fa-arrow-left" margin="10px 0 0 0" />
				</div>

				<Link to="/product">
					<Icon id="fa-plus" margin="10px 0 0 15px" />
				</Link>
				<Link to="/users">
					<Icon id="fa-users" margin="10px 0 0 15px" />
				</Link>
				<Link to="/basket">
					<Icon id="fa-shopping-bag" margin="10px 0 0 15px" />
				</Link>
			</div>
		</div>
	);
};
