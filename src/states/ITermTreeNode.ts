/**
 * @copyright Microsoft Corporation. All rights reserved.
 */

import TermTreeNodeType from './TermTreeNodeType';
import TermNodeInfoType from './TermNodeInfoType';

export interface ITermTreeNode {
  nodeType: TermTreeNodeType;
  level: number;
  childrenUri: string;
  isOpen?: boolean;
  info: ITermTreeNodeAPIResponse;
}

export interface ITermTreeNodeAPIResponse {
  id: string;
  type: TermNodeInfoType;
  name: string;
}
