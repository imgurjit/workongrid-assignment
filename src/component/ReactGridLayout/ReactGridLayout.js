/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, createRef, useEffect } from "react";
import { useIsVisible } from "../../useVisible";
import inWords from "../../misc";
import "../../styles/global.sass";

const ReacGridItem = ({ forwardedRef, item }) => {
  const isVisible = useIsVisible(forwardedRef);
  useEffect(() => {
    if (isVisible) {
      console.log(`${item} was called`);
    }
  }, [isVisible]);

  return (
    <div className="grid-item" ref={forwardedRef}>
      {inWords(item)}
    </div>
  );
};

const ReactGridLayout = ({ columns, noOfBoxes }) => {
  const keys = [...Array(noOfBoxes).keys()];

  const refsById = useMemo(() => {
    const refs = {};
    keys.forEach((item, i) => {
      refs[i] = createRef(null);
    });

    return refs;
  }, [keys]);

  return (
    <div
      className="grid-container"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {keys.map((item, i) => (
        <ReacGridItem forwardedRef={refsById[i]} item={item}></ReacGridItem>
      ))}
    </div>
  );
};

export default ReactGridLayout;
