/**
 * @copyright Microsoft Corporation. All rights reserved.
 */

import * as React from "react";
import { Spinner, Icon, IconButton } from "office-ui-fabric-react";

import { ITermTreeNode } from "../../states/ITermTreeNode";
import "../../TermStoreAdminCenterPage.css";
import TermNodeInfoType from "../../states/TermNodeInfoType";

function getPaddingLeft(level: number, type: TermNodeInfoType): number {
  return level * 20;
}

export interface ITreeNodeProps {
  currentNode: ITermTreeNode;
  show: boolean;
  selectedTermTreeNode: ITermTreeNode;
  onNodeSelect: (node: ITermTreeNode) => void;
  loadNodeChildren: (currentNode: ITermTreeNode) => Promise<ITermTreeNode[]>;
}

export function TreeNode(props: ITreeNodeProps): JSX.Element {
  const [node, setNode] = React.useState(props.currentNode);
  const [children, setChildren] = React.useState([] as ITermTreeNode[]);
  const [loading, setLoading] = React.useState(false);
  const [highlighted, setHighLighted] = React.useState(false);

  React.useEffect(() => {
    if (
      props.selectedTermTreeNode &&
      props.selectedTermTreeNode.nodeType === node.nodeType &&
      props.selectedTermTreeNode.info.id === node.info.id
    ) {
      setNode(props.selectedTermTreeNode);
    }
  }, [props.selectedTermTreeNode]);

  function onToggle(): void {
    if (!node.isOpen) {
      // call load children
      loadChildren();
    }
    setNode({ ...node, isOpen: !node.isOpen });
  }

  async function loadChildren(): Promise<void> {
    if (
      children.length === 0 &&
      node.info &&
      node.info.type === TermNodeInfoType.FOLDER
    ) {
      setLoading(true);
      try {
        const response: ITermTreeNode[] = await props.loadNodeChildren(node);
        setChildren(response);
      } catch (err) {
        // TODO danimmag: 'error in api call TODO: handle';
      }
      setLoading(false);
    }
  }

  function getChevron(): string {
    return node.info.type === TermNodeInfoType.FOLDER && node.isOpen
      ? "ChevronDownMed"
      : "ChevronRightMed";
  }

  function getFolderIcon(): string {
    if (node.info.type === TermNodeInfoType.FILE) {
      return "Script";
    } else if (node.info.type === TermNodeInfoType.FOLDER) {
      return node.isOpen ? "FabricOpenFolderHorizontal" : "FabricFolderFill";
    } else {
      return "";
    }
  }

  function enableHighlight(): void {
    setHighLighted(true);
  }

  function disableHighlight(): void {
    setHighLighted(false);
  }

  return (
    <>
      <div
        className="treeNode"
        style={{
          paddingLeft: getPaddingLeft(node.level, node.info.type),
          display: props.show ? "flex" : "none"
        }}
        onMouseEnter={enableHighlight}
        onMouseLeave={disableHighlight}
      >
        {loading ? (
          <Spinner className="treeNodeIcon" />
        ) : (
          <span
            role="button"
            data-automation-id="treeNodeToggleChevron"
            onClick={onToggle}
          >
            <Icon className="treeNodeIcon" iconName={getChevron()} />
          </span>
        )}
        <Icon style={{ marginRight: 5 }} iconName={getFolderIcon()} />
        <span
          role="button"
          data-automation-id="treeNodeDisplayName"
          style={{ whiteSpace: "nowrap", width: "100%" }}
          onClick={() => props.onNodeSelect(node)}
        >
          {node.info.name}
        </span>
        <IconButton
          style={{ visibility: highlighted ? "initial" : "hidden" }}
          iconProps={{ iconName: "MoreVertical" }}
          onClick={() => alert("I'm Clicked!")} // TODO danimmag: to be implemented
        />
      </div>

      {children.map(childNode => (
        <TreeNode
          key={childNode.info.id}
          show={props.show && node.isOpen ? true : false}
          currentNode={childNode}
          onNodeSelect={props.onNodeSelect}
          selectedTermTreeNode={props.selectedTermTreeNode}
          loadNodeChildren={props.loadNodeChildren}
        />
      ))}
    </>
  );
}

export default TreeNode;
