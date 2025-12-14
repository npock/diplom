import React from 'react';
import style from './SelectField.module.css';

export const SelectField = ({
	name,
	label,
	error,
	onChange,
	value,
	options,
}) => {
	return (
		<div className={style.SelectContainer}>
			<label htmlFor={name} className={style.Label}>
				{label}
			</label>
			<select
				id={name}
				value={value}
				//defaultValue={value}
				onChange={onChange}
				name={name}
				className={style.Select}
			>
				{options.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
			{error && <span className={style.error}>{error}</span>}
		</div>
	);
};
