import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { initializeIcons } from "office-ui-fabric-react";

initializeIcons();
configure({ adapter: new Adapter() });
