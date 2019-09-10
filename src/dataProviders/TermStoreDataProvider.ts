/**
 * @copyright Microsoft Corporation. All rights reserved.
 */
import { ITermStoreDataProvider } from './ITermStoreDataProvider';
import { ITermTreeNodeAPIResponse } from '../states/ITermTreeNode';
import { ITermStoreEndpoint } from './endpoints/ITermStoreEndpoint';
import { MockTermStoreEndpoint } from './endpoints/MockTermStoreEndpoint';
// ES6 Module implementation of a singleton
const _endpoint: ITermStoreEndpoint = MockTermStoreEndpoint;

function getTermStore(): Promise<ITermTreeNodeAPIResponse> {
  return _endpoint.getTermStore();
}

function getNodeChildren(uri: string): Promise<ITermTreeNodeAPIResponse[]> {
  return _endpoint.getNodeChildren(uri);
}

// tslint:disable-next-line:variable-name
export const TermStoreDataProvider: ITermStoreDataProvider = {
  getTermStore,
  getNodeChildren
};
