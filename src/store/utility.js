export const updateObject = (updateState, updateProperties) => {
	return {
		...updateState,
		...updateProperties,
	};
};
