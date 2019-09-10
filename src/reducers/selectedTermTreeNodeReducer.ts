/**
 * @copyright Microsoft Corporation. All rights reserved.
 */

import actionTypes from "../actions/TermStoreAdminActionTypes";
import termTreeNodeTypes from "../states/TermTreeNodeType";
import {
  ITermTreeNode,
  ITermTreeNodeAPIResponse
} from "../states/ITermTreeNode";
import TermTreeNodeType from "../states/TermTreeNodeType";
import { IAction } from "../states/IAction";

export const initialState: ITermTreeNode = {
  nodeType: TermTreeNodeType.EMPTY,
  level: 0,
  childrenUri: "",
  info: (undefined as unknown) as ITermTreeNodeAPIResponse
};

export default function selectedTermTreeNodeReducer(
  state: ITermTreeNode,
  action: IAction
): ITermTreeNode {
  switch (action.type) {
    case actionTypes.LOAD_TERM_STORE_SUCCESS: {
      return {
        nodeType: termTreeNodeTypes.TERM_STORE,
        level: 0,
        childrenUri: "termGroups",
        info: { ...action.payload }
      };
    }
    case actionTypes.ON_TREE_NODE_SELECT: {
      return { ...action.payload };
    }
    case actionTypes.EDIT_TERMSTORE_ADMINS_SUCCESS: {
      return { ...state, info: { ...action.payload } };
    }
    case actionTypes.EDIT_TERMSTORE_LANGUAGES_SUCCESS: {
      return { ...state, info: { ...action.payload } };
    }
    default:
      return state;
  }
}
