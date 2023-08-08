import { useState } from "react";
import Dropdown from "./CustomDropdown";
import DropdownMultiple from "./CustomMultipleDropdown";

const CustomDropdownDemo = () => {
  const [fruits] = useState([
    {
      label: "Apple",
      value: "apple",
    },
    {
      label: "Banana",
      value: "banana",
    },
    {
      label: "Pear",
      value: "pear",
    },
    {
      label: "Mango",
      value: "mango",
    },
    {
      label: "Grape",
      value: "grape",
    },
    {
      label: "Orange",
      value: "orange",
    },
    {
      label: "Watermelon",
      value: "watermelon",
    },
    {
      label: "Strawberry",
      value: "strawberry",
    },
  ]);

  const onChange = (item, name) => {
    console.log("On Selection Change");
    console.log(item, name);
  };

  return (
    <div>
      <div className="demo-item">
        <div className="demo-span">Single Select Dropdown:</div>
        <Dropdown
          name="fruit"
          title="Select fruit"
          list={fruits}
          onChange={onChange}
        ></Dropdown>
      </div>

      <div className="demo-item">
        <div className="demo-span">Single Select Dropdown with Search:</div>
        <Dropdown
          name="fruit"
          title="Select fruit"
          list={fruits}
          onChange={onChange}
          searchable={true}
        ></Dropdown>
      </div>

      <div className="demo-item">
        <div className="demo-span">Multi Select Dropdown:</div>
        <DropdownMultiple
          name="fruit"
          titleSingular="Fruit"
          title="Select fruits"
          list={fruits}
          onChange={onChange}
        />
      </div>

      <div className="demo-item">
        <div className="demo-span">Multi Select Dropdown with Search:</div>
        <DropdownMultiple
          name="fruits"
          titleSingular="Fruit"
          title="Select fruits"
          list={fruits}
          onChange={onChange}
          searchable={true}
        />
      </div>
    </div>
  );
};

export default CustomDropdownDemo;
