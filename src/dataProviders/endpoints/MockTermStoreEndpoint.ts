/**
 * @copyright Microsoft Corporation. All rights reserved.
 */
/* tslint:disable */
import { ITermStoreEndpoint } from "./ITermStoreEndpoint";
import { ITermTreeNodeAPIResponse } from "../../states/ITermTreeNode";

// ES6 Module implementation of a singleton
const baseUrl = "http://localhost:3001";

async function getTermStore(): Promise<ITermTreeNodeAPIResponse> {
  try {
    let response = await fetch(baseUrl + "/termStores/0");
    return handleResponse(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("API call failed. " + error);
    throw error;
  }
}

async function getNodeChildren(
  uri: string
): Promise<ITermTreeNodeAPIResponse[]> {
  try {
    let response = await fetch(baseUrl + "/" + uri);
    return handleResponse(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("API call failed. " + error);
    throw error;
  }
}

async function handleResponse(response: any) {
  if (response.ok) return response.json();
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

export const MockTermStoreEndpoint: ITermStoreEndpoint = {
  getTermStore,
  getNodeChildren
};
/* tslint:enable */
