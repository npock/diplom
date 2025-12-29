import style from './Button.module.css';
export const Button = ({ children, className = style.btn, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};
