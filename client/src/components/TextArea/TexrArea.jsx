import style from './Textarea.module.css'; // Импорт стилей
export const TextArea = ({
	label,
	name,
	value,
	onChange,
	error,
	placeholder,
}) => {
	return (
		<div className={style.container}>
			{label && (
				<label htmlFor={name} className={style.label}>
					{label}
				</label>
			)}

			<textarea
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className={`${style.textarea} ${error ? style.errorField : ''}`}
				required
			/>

			{error && <span className={style.errorMessage}>{error}</span>}
		</div>
	);
};
