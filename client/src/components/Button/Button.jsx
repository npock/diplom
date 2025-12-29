import style from './Button.module.css';
export const Button = ({ children, variant = 'primary', ...props }) => {
	const className = `${style.btn} ${variant === 'danger' ? style.delete : ''}`;

	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};
