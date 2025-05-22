import type { JSX } from "react";
import React from "react";
import { HeaderStateContext, useHeaderStateContext } from "../hooks/useHeaderState";
import { Provider as ReduxProvider } from 'react-redux';
import { store } from "../store/store";

/**
 * This component is used to flatten the nested children of a component.
 */
function ChildrenFlattener({
  children
}: {
  children?: React.ReactNode | React.ReactNode[];
}): JSX.Element {
  const childrenArray = React.Children.toArray(children) as React.ReactElement[];

  return <>
    {
      childrenArray.reduceRight(
        (loopChild, node) => {
          const children = React.Children.toArray((node.props as any).children || []);
          return React.cloneElement(node, {}, <>
            {children}
            {loopChild}
          </>);
        },
        <></>,
      )
    }
  </>
};

export default function Providers({
  children,
}: {
  children?: React.ReactNode | React.ReactNode[];
}) {
  return <ChildrenFlattener>
    <HeaderStateContext.Provider value={useHeaderStateContext()} />
    <ReduxProvider store={store}>
      {children}
    </ReduxProvider>
  </ChildrenFlattener>
}