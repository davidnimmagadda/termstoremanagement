/**
 * @copyright Microsoft Corporation. All rights reserved.
 */

import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { create, ReactTestRenderer } from "react-test-renderer";

import TreeNode, { ITreeNodeProps } from "../TreeNode";
import TermTreeNodeType from "../../../states/TermTreeNodeType";
import TermNodeInfoType from "../../../states/TermNodeInfoType";
import { ITermTreeNode } from "../../../states/ITermTreeNode";

describe("Term Store Admin Center Page", () => {
  describe("Tree Node", () => {
    const node: ITermTreeNode = {
      nodeType: TermTreeNodeType.TERM_STORE,
      level: 0,
      childrenUri: "termGroups",
      info: {
        id: "abc",
        type: TermNodeInfoType.FOLDER,
        name: "Taxonomy term store"
      }
    };
    const treeNodeProps: ITreeNodeProps = {
      currentNode: node,
      show: true,
      selectedTermTreeNode: node,
      onNodeSelect: jest.fn(),
      loadNodeChildren: jest.fn()
    };

    it("should render same as previous", () => {
      const tree: ReactTestRenderer = create(<TreeNode {...treeNodeProps} />);
      expect(tree).toMatchSnapshot();
    });

    it("should call load children on chevron click", () => {
      const component: ShallowWrapper = shallow(
        <TreeNode {...treeNodeProps} />
      );
      component
        .find('[data-automation-id="treeNodeToggleChevron"]')
        .simulate("click");
      expect(treeNodeProps.loadNodeChildren).toHaveBeenCalled();
    });

    it("should call load 2 children on chevron click", () => {
      (treeNodeProps.loadNodeChildren as jest.Mock).mockReturnValue(
        Promise.resolve([
          { id: "12", type: TermNodeInfoType.FOLDER, name: "cdscs csd" },
          { id: "13", type: TermNodeInfoType.FOLDER, name: "dsdc csd" }
        ])
      );
      const component: ShallowWrapper = shallow(
        <TreeNode {...treeNodeProps} />
      );
      component
        .find('[data-automation-id="treeNodeToggleChevron"]')
        .simulate("click");
      expect(treeNodeProps.loadNodeChildren).toHaveBeenCalledWith(
        treeNodeProps.currentNode
      );
    });

    it("should call on node select on click of node display name", () => {
      const component: ShallowWrapper = shallow(
        <TreeNode {...treeNodeProps} />
      );
      component
        .find('[data-automation-id="treeNodeDisplayName"]')
        .simulate("click");
      expect(treeNodeProps.onNodeSelect).toHaveBeenCalled();
    });
  });
});
