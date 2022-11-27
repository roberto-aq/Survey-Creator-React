export const surveyReducer = (initialState = [], action) => {
	switch (action.type) {
		case 'Add Survey':
			return [...initialState, action.payload];

		case 'Delete Survey':
			return initialState.filter(
				survey => survey.id !== action.payload
			);

		case 'Update Survey':
			return initialState.map(survey => {
				if (survey.id === action.payload.id) {
					return {
						...survey,
						questions: action.payload.questions,
						name: action.payload.name,
						schema: action.payload.schema,
						responses: [...action.payload.responses],
					};
				}

				return survey;
			});

		default:
			return initialState;
	}
};
