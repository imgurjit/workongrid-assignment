import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import pluralize from "pluralize";
import { ReactComponent as ArrowDown } from "../../assets/arrowDown.svg";
import { ReactComponent as ArrowUp } from "../../assets/arrowUp.svg";
import { ReactComponent as Check } from "../../assets/check.svg";
import "../../styles/global.sass";

const DropdownMultiple = ({
  title,
  titleSingular,
  list,
  select,
  name,
  onChange,
  id,
  searchable,
  styles,
  closeOnSelection,
}) => {
  const [state, setState] = useState({
    isListOpen: false,
    title,
    selectedItems: [],
    keyword: "",
    list,
  });

  const searchField = React.createRef();

  useEffect(() => {
    if (select.length) {
      selectMultipleItems(select);
    }
  }, [select]);

  useEffect(() => {
    onChange(state.selectedItems, name);
    handleTitle();
  }, [state.selectedItems]);

  const selectItem = (item, noCloseOnSelection = false) => {
    setState({
      ...state,
      isListOpen: (!noCloseOnSelection && !closeOnSelection) || false,
    });
    handleSelection(item, state.selectedItems);
  };

  const selectMultipleItems = (items) => {
    const { list } = this.state;

    items.forEach((item) => {
      const selectedItem = list.find((i) => i.value === item.value);
      setTimeout(() => {
        selectItem(selectedItem, true);
      });
    });
  };

  const handleTitle = () => {
    const { selectedItems } = state;
    const { length } = selectedItems;

    if (!length) setState({ ...state, title: title });
    else if (length === 1)
      setState({ ...state, title: `${length} ${titleSingular}` });
    else {
      const pluralizedTitle = pluralize(titleSingular, length);
      setState({ ...state, title: `${length} ${pluralizedTitle}` });
    }
  };

  const handleSelection = (item, selectedItems) => {
    const index = selectedItems.findIndex((i) => i.value === item.value);
    if (index !== -1) {
      const selectedItemsCopy = [...selectedItems];
      selectedItemsCopy.splice(index, 1);
      setState({ ...state, selectedItems: selectedItemsCopy });
    } else
      setState({ ...state, selectedItems: [...state.selectedItems, item] });
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

  const listItems = () => {
    const { listItem, listItemNoResult } = styles;
    const { keyword, list, selectedItems } = state;
    let tempList = [...list];

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
          style={listItem}
          key={item.value}
          onClick={() => selectItem(item)}
        >
          {item.label}
          {selectedItems.some((i) => i.value === item.value) && (
            <span>
              <Check />
            </span>
          )}
        </button>
      ));
    }

    return (
      <div className={`dd-list-item no-result ${id}`} style={listItemNoResult}>
        {searchable[1]}
      </div>
    );
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
        <div
          role="list"
          type="button"
          className={`dd-list ${searchable ? " searchable" : ""} ${id}`}
          onClick={(e) => e.stopPropagation()}
        >
          {searchable && (
            <input
              ref={searchField}
              className={`dd-list-search-bar ${id}`}
              placeholder="Search"
              onChange={(e) => filterList(e)}
            />
          )}
          <div className={`dd-scroll-list ${id}`}>{listItems()}</div>
        </div>
      )}
    </div>
  );
};

DropdownMultiple.defaultProps = {
  id: "",
  select: [],
  closeOnSelection: false,
  searchable: undefined,
  styles: {},
};

DropdownMultiple.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  titleSingular: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  closeOnSelection: PropTypes.bool,
  searchable: PropTypes.bool,
  select: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
    })
  ),
};

export default DropdownMultiple;
