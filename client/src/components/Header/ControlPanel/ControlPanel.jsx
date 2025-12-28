import { Icon } from '../../Icon/Icon';
import { Link, useNavigate } from 'react-router-dom';
import style from './ControlPanel.module.css';
import { useDispatch, useSelector } from 'react-redux';
// import { ROLE } from '../../../bff/constants/role';
// import { logoutUser } from '../../../store/actions/logout';
import { logOut } from '../../../store/appReducers';
import { AdminRoute } from '../../../AdminRoute';

export const ControlPanel = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.user.authUser.name);
	const id = useSelector((state) => state.user.authUser._id);
	const role = useSelector((state) => state.user.authUser.role);
	const isLoading = useSelector((state) => state.user.isLoading);

	const signOut = () => {
		dispatch(logOut());
	};
	if (isLoading) {
		return <>...Loading</>;
	}
	return (
		<div className={style.ControlPanelContainer}>
			{!userLogin ? (
				<Link className={style.ButttonSign} to="/login">
					sign in
				</Link>
			) : (
				<>
					<Link className={style.user} to={`users/:${id}`}>
						{userLogin}
					</Link>
					<div className={style.buttonLogout} onClick={signOut}>
						<Icon id="fa-sign-out" margin="10px 0 0 0" />
					</div>
				</>
			)}

			<div className={style.rightAlign}>
				<div className={style.buttonBack} onClick={() => navigate(-1)}>
					<Icon id="fa-arrow-left" margin="10px 0 0 0" />
				</div>
				{role === 'admin' ? (
					<>
						<Link to="/newStuff">
							<Icon id="fa-plus" margin="10px 0 0 15px" />
						</Link>
						<Link to="/users">
							<Icon id="fa-users" margin="10px 0 0 15px" />
						</Link>
					</>
				) : null}

				<Link to="/basket">
					<Icon id="fa-shopping-bag" margin="10px 0 0 15px" />
				</Link>
			</div>
		</div>
	);
};
