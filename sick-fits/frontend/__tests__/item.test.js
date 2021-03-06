import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import ItemComponent from "../components/Item";
import formatMoney from "../lib/formatMoney";

const fakeItem = {
  id: "ABC123",
  title: "A cool item",
  price: 5000,
  description: "This item is really cool!",
  image: "dog.png",
  largeImage: "largedog.png"
};

describe("<Item />", () => {
  // it("renders the image properly", () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />);
  //   const img = wrapper.find("img");

  //   expect(img.props().src).toBe(fakeItem.image);
  //   expect(img.props().alt).toBe(fakeItem.title);
  // });

  // it("renders the title and pricetag properly", () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />);
  //   const PriceTag = wrapper.find("PriceTag");

  //   expect(PriceTag.children().text()).toBe(formatMoney(fakeItem.price));
  //   expect(wrapper.find("Title a").text()).toBe(fakeItem.title);
  // });

  // it("renders out the buttons properly", () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />);
  //   const buttonList = wrapper.find(".buttonList");

  //   expect(buttonList.children()).toHaveLength(3);
  //   expect(buttonList.find("Link").exists()).toBe(true);
  //   expect(buttonList.find("AddToCart").exists()).toBe(true);
  //   expect(buttonList.find("DeleteItem").exists()).toBe(true);
  // });

  it("renders and matches the snapshot", () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  })
});
