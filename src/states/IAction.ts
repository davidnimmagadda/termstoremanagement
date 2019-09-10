/**
 * We are following FSA (Flux Standard Action) compliant actions, which is mentioned in Redux documentations.
 * This Flux is not a typo :)
 */
export interface IAction {
  /**
   * We use strings to represent action types.
   * Each page should have separated definitions for all allowed types.
   *
   * For example:
   *
   * type enum ActionTypes = 'ADD_ITEM' | 'REMOVE_ITEM';
   */
  type: string;

  /**
   * The optional payload can be anything holds, well, the payload.
   * If `error` is `true`, the payload should be an error object.
   */
  // tslint:disable-next-line:no-any
  payload?: any;

  /**
   * A `true` value means the action has an error.
   * Any other values, including `undefined` and `null`, means the action is good.
   */
  error?: boolean;

  /**
   * The optional meta can be anything holds extra information that is not part of the payload.
   */
  // tslint:disable-next-line:no-any
  meta?: any;
}
