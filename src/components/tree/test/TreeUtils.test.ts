import {
  getTreeNodeType,
  getChildrenUri,
  loadNodeChildren
} from "../TreeUtils";
import TermTreeNodeType from "../../../states/TermTreeNodeType";
import {
  ITermTreeNode,
  ITermTreeNodeAPIResponse
} from "../../../states/ITermTreeNode";
import TermNodeInfoType from "../../../states/TermNodeInfoType";
import { TermStoreDataProvider } from "../../../dataProviders/TermStoreDataProvider";

describe("Term Store Admin Center Page", () => {
  describe("Tree Utils", () => {
    it("should return term store, term group, term set, term based on level", () => {
      expect(getTreeNodeType(0)).toEqual(TermTreeNodeType.TERM_STORE);
      expect(getTreeNodeType(1)).toEqual(TermTreeNodeType.TERM_GROUP);
      expect(getTreeNodeType(2)).toEqual(TermTreeNodeType.TERM_SET);
      expect(getTreeNodeType(3)).toEqual(TermTreeNodeType.TERM);
      expect(getTreeNodeType(100)).toEqual(TermTreeNodeType.TERM);
    });

    const node: ITermTreeNode = {
      nodeType: TermTreeNodeType.TERM_STORE,
      level: 0,
      childrenUri: "abcd",
      info: (undefined as unknown) as ITermTreeNodeAPIResponse
    };

    const childapiresp: ITermTreeNodeAPIResponse = {
      id: "abc",
      type: TermNodeInfoType.FOLDER,
      name: "test"
    };

    it("should return appropriate uri", () => {
      expect(getChildrenUri({ ...node, level: 0 }, childapiresp)).toEqual(
        node.childrenUri + "/" + childapiresp.id + "/termSets"
      );
      expect(getChildrenUri({ ...node, level: 1 }, childapiresp)).toEqual(
        node.childrenUri + "/" + childapiresp.id + "/terms"
      );
      expect(getChildrenUri({ ...node, level: 2 }, childapiresp)).toEqual(
        "terms/" + childapiresp.id + "/terms"
      );
      expect(getChildrenUri({ ...node, level: 100 }, childapiresp)).toEqual(
        "terms/" + childapiresp.id + "/terms"
      );
    });

    const mockApiResponse: ITermTreeNodeAPIResponse[] = [
      {
        id: "635e69f3-fbcf-4952-8370-fbef46d401e1",
        type: TermNodeInfoType.FOLDER,
        name: "People"
      },
      {
        id: "635e69f3-fbcf-4952-8370-fbef46d401e2",
        type: TermNodeInfoType.FOLDER,
        name: "System"
      }
    ];

    it("should resolve these expectations on loadNodeChildren response", async () => {
      const getNodeChildrenMock: jest.SpyInstance<
        Promise<ITermTreeNodeAPIResponse[]>,
        [string]
      > = jest.spyOn(TermStoreDataProvider, "getNodeChildren");

      getNodeChildrenMock.mockImplementation(() =>
        Promise.resolve(mockApiResponse)
      );
      const currentNode: ITermTreeNode = {
        nodeType: TermTreeNodeType.TERM_STORE,
        level: 0,
        childrenUri: "termGroups",
        info: (undefined as unknown) as ITermTreeNodeAPIResponse
      };

      const resp: ITermTreeNode[] = await loadNodeChildren(currentNode);
      expect(resp).toHaveLength(2);
      expect(resp[0].level).toEqual(1);
      expect(resp[0].nodeType).toEqual(TermTreeNodeType.TERM_GROUP);
      expect(resp[0].childrenUri).toEqual(
        "termGroups/635e69f3-fbcf-4952-8370-fbef46d401e1/termSets"
      );
      expect(resp[0].info.name).toEqual("People");
    });
  });
});
