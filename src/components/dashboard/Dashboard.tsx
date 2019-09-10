/**
 * @copyright Microsoft Corporation. All rights reserved.
 */
import * as React from "react";
import { Spinner, SpinnerSize } from "office-ui-fabric-react";

import TreeNode from "../tree/TreeNode";
import * as utils from "../tree/TreeUtils";
import {
  ITermTreeNode,
  ITermTreeNodeAPIResponse
} from "../../states/ITermTreeNode";
import { TermStoreDataProvider } from "../../dataProviders/TermStoreDataProvider";
import actionTypes from "../../actions/TermStoreAdminActionTypes";
import "../../TermStoreAdminCenterPage.css";
import TermTreeNodeType from "../../states/TermTreeNodeType";
import selectedTermTreeNodeReducer, {
  initialState
} from "../../reducers/selectedTermTreeNodeReducer";

export function Dashboard(): JSX.Element {
  const [selectedTermTreeNode, dispatch] = React.useReducer(
    selectedTermTreeNodeReducer,
    initialState
  );

  React.useEffect(() => {
    loadTermStore();
  }, []);

  async function loadTermStore(): Promise<void> {
    // TODO danimmag: Will be replaced with actual API call using odata client. This is a mock API
    const response: ITermTreeNodeAPIResponse = await TermStoreDataProvider.getTermStore();
    dispatch({
      type: actionTypes.LOAD_TERM_STORE_SUCCESS,
      payload: response
    });
  }

  function getRightPane(): JSX.Element {
    return (
      <div style={{ marginLeft: "20px" }}>
        <h3>{selectedTermTreeNode.nodeType}</h3>
      </div>
    );
  }

  function onNodeSelect(node: ITermTreeNode): void {
    dispatch({
      type: actionTypes.ON_TREE_NODE_SELECT,
      payload: node
    });
  }

  return (
    <>
      <div className="headerContainer">
        <h1>Term Store Admin Center</h1>
      </div>
      <div className="dashboard">
        {selectedTermTreeNode.nodeType === TermTreeNodeType.EMPTY ? (
          <div className="loaderContainer">
            <Spinner size={SpinnerSize.large} />
          </div>
        ) : (
          <>
            <div className="treeContainer">
              <TreeNode
                currentNode={selectedTermTreeNode}
                selectedTermTreeNode={selectedTermTreeNode}
                show={true}
                onNodeSelect={onNodeSelect}
                loadNodeChildren={utils.loadNodeChildren}
              />
            </div>
            <div className="rightPane">{getRightPane()}</div>
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
