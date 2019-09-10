/**
 * @copyright Microsoft Corporation. All rights reserved.
 */

import { ITermTreeNodeAPIResponse } from '../../states/ITermTreeNode';

export interface ITermStoreEndpoint {
  getTermStore(): Promise<ITermTreeNodeAPIResponse>;

  getNodeChildren(uri: string): Promise<ITermTreeNodeAPIResponse[]>;
}
