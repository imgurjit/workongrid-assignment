import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { ReactComponent as ArrowDown } from "../../assets/arrowDown.svg";
import { ReactComponent as ArrowUp } from "../../assets/arrowUp.svg";
import { ReactComponent as Check } from "../../assets/check.svg";
import "../../styles/global.sass";

const Dropdown = ({ name, title, list, select, onChange, id, searchable }) => {
  const [state, setState] = useState({
    isListOpen: false,
    title,
    selectedItem: null,
    keyword: "",
    list,
  });

  const searchField = React.createRef();

  useEffect(() => {
    if (select) {
      selectSingleItem(select);
    }
  }, [select]);

  const selectSingleItem = (item) => {
    const selectedItem = list.find((i) => i.value === item.value);
    selectItem(selectedItem);
  };

  const selectItem = (item) => {
    const { label, value } = item;
    const { list, selectedItem } = state;

    let foundItem;

    if (!label) {
      foundItem = list.find((i) => i.value === item.value);
    }

    setState({
      ...state,
      title: label || foundItem.label,
      isListOpen: false,
      selectedItem: item,
    });
    if (selectedItem?.value !== value) onChange(item, name);
  };

  const listItems = () => {
    const { keyword, list } = state;
    let tempList = [...list];
    const selectedItemValue = state.selectedItem?.value;

    if (keyword.length) {
      tempList = list.filter((item) =>
        item.label.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    if (tempList.length) {
      return tempList.map((item) => (
        <button
          type="button"
          className={`dd-list-item ${id}`}
          key={item.value}
          onClick={() => selectItem(item)}
        >
          {item.label}{" "}
          {item.value === selectedItemValue && (
            <span>
              <Check />
            </span>
          )}
        </button>
      ));
    }

    return (
      <div className={`dd-list-item no-result ${id}`}>{searchable[1]}</div>
    );
  };

  const toggleList = () => {
    setState({ ...state, isListOpen: !state.isListOpen, keyword: "" });
  };

  const filterList = (e) => {
    setState({
      ...state,
      keyword: e.target.value.toLowerCase(),
    });
  };

  return (
    <div className={`dd-wrapper ${id}`}>
      <button type="button" className={`dd-header ${id}`} onClick={toggleList}>
        <div className={`dd-header-title ${id}`}>{state.title}</div>
        {state.isListOpen ? (
          <span>
            <ArrowUp />
          </span>
        ) : (
          <span>
            <ArrowDown />
          </span>
        )}
      </button>
      {state.isListOpen && (
        <div className={`dd-list${searchable ? " searchable" : ""} ${id}`}>
          {searchable && (
            <input
              ref={searchField}
              className={`dd-list-search-bar ${id}`}
              placeholder="Search"
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => filterList(e)}
            />
          )}
          <div className={`dd-scroll-list ${id}`}>{listItems()}</div>
        </div>
      )}
    </div>
  );
};

Dropdown.defaultProps = {
  id: "",
  select: undefined,
  searchable: undefined,
};

Dropdown.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  select: PropTypes.shape({ value: PropTypes.string }),
  searchable: PropTypes.bool,
};

export default Dropdown;
