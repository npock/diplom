import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './UserPage.module.css'; // Импорт стилей

export default function UserPage() {
	const authUser = useSelector((state) => state.user.authUser);
	const isLoadingUser = useSelector((state) => state.user.isLoading);
	const userError = useSelector((state) => state.user.error);

	const navigate = useNavigate();

	if (isLoadingUser) {
		return (
			<div className={styles.pageContainer}>
				<span>...loading</span>
			</div>
		);
	}
	if (userError || !authUser) {
		return (
			<div className={styles.pageContainer}>
				<span>smth went wrong</span>
			</div>
		);
	}

	return (
		<div className={styles.pageContainer}>
			<div className={styles.profileCard}>
				<h3 className={styles.title}>User Profile</h3>

				<div className={styles.infoGroup}>
					<p className={styles.infoItem}>
						👤 <strong>Имя:</strong> {authUser.name}
					</p>
					<p className={styles.infoItem}>
						📧 <strong>Email:</strong> {authUser.email}
					</p>
					<p className={styles.infoItem}>
						📅 <strong>Регистрация:</strong>{' '}
						{new Date(authUser.createdAt).toLocaleDateString()}
					</p>
					<p className={styles.infoItem}>
						🛡️ <strong>Роль:</strong> {authUser.role}
					</p>
				</div>

				<div className={styles.actionGroup}>
					<Link
						to={`/users/${authUser._id}/edit`}
						className={`${styles.linkBtn} ${styles.editBtn}`}
					>
						Edit Profile
					</Link>

					<Link
						to={`/saleStuff`}
						className={`${styles.linkBtn} ${styles.secondaryLink}`}
					>
						📦 Мои товары
					</Link>

					<Link
						to={'/myReviews'}
						className={`${styles.linkBtn} ${styles.secondaryLink}`}
					>
						💬 My reviews
					</Link>

					<button
						className={styles.backBtn}
						onClick={() => navigate('/')}
					>
						← Back to Home
					</button>
				</div>
			</div>
		</div>
	);
}
