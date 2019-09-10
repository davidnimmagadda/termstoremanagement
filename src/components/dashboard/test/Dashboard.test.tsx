/**
 * @copyright Microsoft Corporation. All rights reserved.
 */

import * as React from "react";
import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import TestRenderer, { create, ReactTestRenderer } from "react-test-renderer";

import { Dashboard } from "../Dashboard";
import { ITermTreeNodeAPIResponse } from "../../../states/ITermTreeNode";
import { TermStoreDataProvider } from "../../../dataProviders/TermStoreDataProvider";
import TermTreeNodeType from "../../../states/TermTreeNodeType";
import TermNodeInfoType from "../../../states/TermNodeInfoType";
import { Spinner } from "office-ui-fabric-react";

describe("Term Store Admin Center Page", () => {
  describe("Dashboard", () => {
    let wrapper: ReactWrapper;
    // tslint:disable-next-line:no-any
    let getTermStoreMock: jest.SpyInstance<
      Promise<ITermTreeNodeAPIResponse>,
      []
    >;

    beforeEach(() => {
      getTermStoreMock = jest.spyOn(TermStoreDataProvider, "getTermStore");
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    const termSetSelectedNode: ITermTreeNodeAPIResponse = {
      id: "23234",
      type: TermNodeInfoType.FOLDER,
      name: "test"
    };

    it("should render same as previous", async () => {
      getTermStoreMock.mockImplementation(() =>
        Promise.resolve(termSetSelectedNode)
      );
      let tree: ReactTestRenderer = (undefined as unknown) as ReactTestRenderer;
      await TestRenderer.act(async () => {
        tree = create(<Dashboard />);
      });
      expect(tree).toMatchSnapshot();
    });

    it("should render loader when nodeType is empty and load function should be called", () => {
      getTermStoreMock.mockImplementation(() =>
        Promise.resolve({} as ITermTreeNodeAPIResponse)
      );
      act(() => {
        wrapper = mount(<Dashboard />);
      });
      expect(TermStoreDataProvider.getTermStore).toHaveBeenCalled();
    });

    it("should display corresponding nodetype in right pane when not empty, api should not be called", async () => {
      getTermStoreMock.mockImplementation(() =>
        Promise.resolve(termSetSelectedNode)
      );
      await act(async () => {
        wrapper = mount(<Dashboard />);
      });
      wrapper.update();
      expect(TermStoreDataProvider.getTermStore).toHaveBeenCalled();
      expect(wrapper.find("h3").text()).toEqual(TermTreeNodeType.TERM_STORE);
    });

    it("should display loader first and after api is called back, will display, tree and right pane", async () => {
      jest.useFakeTimers();
      getTermStoreMock.mockImplementation(() => {
        setTimeout(() => {}, 1000);
        return Promise.resolve(termSetSelectedNode);
      });
      await act(async () => {
        wrapper = mount(<Dashboard />);
      });
      expect(wrapper.find(Spinner)).toHaveLength(1);
      jest.runAllTimers();
      wrapper.update();
      expect(wrapper.find(Spinner)).toHaveLength(0);
      expect(TermStoreDataProvider.getTermStore).toHaveBeenCalled();
      expect(wrapper.find("h3").text()).toEqual(TermTreeNodeType.TERM_STORE);
    });
  });
});
