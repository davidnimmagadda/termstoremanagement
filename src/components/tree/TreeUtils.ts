/**
 * @copyright Microsoft Corporation. All rights reserved.
 */

import {
  ITermTreeNodeAPIResponse,
  ITermTreeNode
} from '../../states/ITermTreeNode';
import termTreeNodeTypes from '../../states/TermTreeNodeType';
import TermTreeNodeType from '../../states/TermTreeNodeType';
import { TermStoreDataProvider } from '../../dataProviders/TermStoreDataProvider';

export async function loadNodeChildren(currNode: ITermTreeNode): Promise<ITermTreeNode[]> {
  const response: ITermTreeNodeAPIResponse[] = await TermStoreDataProvider.getNodeChildren(currNode.childrenUri);
  const _childNodeType: TermTreeNodeType = getTreeNodeType(currNode.level + 1);
  return response.map(childAPIResponse => ({
    id: childAPIResponse.id,
    nodeType: _childNodeType,
    level: currNode.level + 1,
    childrenUri: getChildrenUri(currNode, childAPIResponse),
    info: childAPIResponse
  }));
}

export function getChildrenUri(
  node: ITermTreeNode,
  childNodeInfo: ITermTreeNodeAPIResponse
): string {
  switch (node.level) {
    case 0:
      return node.childrenUri + '/' + childNodeInfo.id + '/termSets';
    case 1:
      return node.childrenUri + '/' + childNodeInfo.id + '/terms';
    default:
      return 'terms/' + childNodeInfo.id + '/terms';
  }
}

export function getTreeNodeType(level: number): TermTreeNodeType {
  switch (level) {
    case 0:
      return termTreeNodeTypes.TERM_STORE;
    case 1:
      return termTreeNodeTypes.TERM_GROUP;
    case 2:
      return termTreeNodeTypes.TERM_SET;
    default:
      return termTreeNodeTypes.TERM;
  }
}
