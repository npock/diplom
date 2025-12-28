const validateRules = {
	isRequired: (value) => {
		return Boolean(value.trim());
	},
	min: (value, min) => {
		return value.length >= min;
	},
	max: (value, max) => {
		return value.length <= max;
	},
	isEmail: (value) => {
		return /^\S+@\S+\.\S+$/.test(value);
	},
	checkPassword: (value, _, password) => {
		return value === password;
	},
	isNumber: (value) => {
		return value !== '' && !isNaN(parseFloat(value)) && isFinite(value);
	},
	minNum: (value, min) => {
		return Number(value) >= min;
	},
	maxNum: (value, max) => {
		return Number(value) <= max;
	},
	isLink: (value) => {
		const pattern = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/.*)?$/i;
		return pattern.test(value);
	},
};

export const validator = (values, config) => {
	const error = {};

	for (const name in values) {
		const validationRules = config[name];
		for (const rule in validationRules) {
			const { message, value, ref } = validationRules[rule];
			const validate = validateRules[rule];

			const hasError =
				validate && !validate(values[name], value, values[ref]);
			if (hasError) {
				error[name] = message;
				break;
			}
		}
	}

	return error;
};
