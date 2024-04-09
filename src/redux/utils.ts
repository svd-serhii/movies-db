import { Action } from "redux";

type ActionHandlers<S> = {
	[key: string]: (state: S, action: any) => S;
};

export function createReducer<TState>(
	initialState: TState,
	handlers: ActionHandlers<TState>
) {
	return function (state: TState, action: Action) {
		state ??= initialState;
		const handler = handlers[action.type];
		return handler?.(state, action) ?? state;
	};
}
