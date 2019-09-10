/**
 * @copyright Microsoft Corporation. All rights reserved.
 */

import { ITermStoreEndpoint } from "./ITermStoreEndpoint";
import { ITermTreeNodeAPIResponse } from "../../states/ITermTreeNode";
// ES6 Module implementation of a singleton
function getNodeChildren(uri: string): Promise<ITermTreeNodeAPIResponse[]> {
  // TODO danimmag: stub responses as of now
  return Promise.resolve([]);
}

function getTermStore(): Promise<ITermTreeNodeAPIResponse> {
  // TODO danimmag: stub responses as of now
  return Promise.resolve((undefined as unknown) as ITermTreeNodeAPIResponse);
}

// tslint:disable-next-line:variable-name
export const TermStoreEndpoint: ITermStoreEndpoint = {
  getTermStore,
  getNodeChildren
};
