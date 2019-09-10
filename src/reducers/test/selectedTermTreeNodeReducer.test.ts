/**
 * @copyright Microsoft Corporation. All rights reserved.
 */

import selectedTermTreeNodeReducer from "../selectedTermTreeNodeReducer";
import actionTypes from "../../actions/TermStoreAdminActionTypes";
import {
  ITermTreeNode,
  ITermTreeNodeAPIResponse
} from "../../states/ITermTreeNode";
import { IAction } from "../../states/IAction";
import termTreeNodeTypes from "../../states/TermTreeNodeType";
import TermNodeInfoType from "../../states/TermNodeInfoType";

describe("Selected Term Tree Node Reducer", () => {
  const originalState: ITermTreeNode = {
    nodeType: termTreeNodeTypes.TERM_STORE,
    level: 0,
    childrenUri: "",
    info: (undefined as unknown) as ITermTreeNodeAPIResponse
  };

  it('should return node type "TERM_STORE", node info as payload when LOAD_TERM_STORE_SUCCESS', () => {
    const action: IAction = {
      type: actionTypes.LOAD_TERM_STORE_SUCCESS,
      payload: {
        id: "xyz",
        type: TermNodeInfoType.FOLDER,
        name: "taxonomy term store"
      }
    };
    const newState: ITermTreeNode = selectedTermTreeNodeReducer(
      originalState,
      action
    );
    expect(newState.nodeType).toEqual(termTreeNodeTypes.TERM_STORE);
    expect(newState.info).toEqual(action.payload);
  });

  it("should return current node state when clicked on the tree node", () => {
    const action: IAction = {
      type: actionTypes.ON_TREE_NODE_SELECT,
      payload: {
        nodeType: termTreeNodeTypes.TERM_SET,
        isOpen: true,
        info: undefined
      }
    };
    const newState: ITermTreeNode = selectedTermTreeNodeReducer(
      originalState,
      action
    );
    expect(newState).toEqual(action.payload);
  });

  it("should change info in the state to new info on Edit Term Store Admins success", () => {
    const action: IAction = {
      type: actionTypes.EDIT_TERMSTORE_ADMINS_SUCCESS,
      payload: { id: "test", admins: [{ a: "1", b: "2" }] }
    };
    const newState: ITermTreeNode = selectedTermTreeNodeReducer(
      originalState,
      action
    );
    expect(newState.nodeType).toEqual(originalState.nodeType);
    expect(newState.info).toEqual(action.payload);
  });

  it("should change info in the state to new info on Edit Term Store Languages success", () => {
    const action: IAction = {
      type: actionTypes.EDIT_TERMSTORE_LANGUAGES_SUCCESS,
      payload: { id: "test", languages: [{ a: "1", b: "2" }] }
    };
    const newState: ITermTreeNode = selectedTermTreeNodeReducer(
      originalState,
      action
    );
    expect(newState.nodeType).toEqual(originalState.nodeType);
    expect(newState.info).toEqual(action.payload);
  });
});
