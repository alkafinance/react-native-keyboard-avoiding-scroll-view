import React from 'react'

// Passthrough function used to type a full-fledged generic React component
// based on a generic function
export function generic<
  TComponent,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TProps = TComponent extends (...args: any[]) => any
    ? Parameters<TComponent>[0]
    : never
>(Component: TComponent) {
  return Component as TComponent &
    Pick<
      React.ComponentType<TProps>,
      'propTypes' | 'contextTypes' | 'defaultProps' | 'displayName'
    >
}

// Generic version of React.memo
export const genericMemo = <
  TComponent, // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TProps = TComponent extends (...args: any[]) => any
    ? Parameters<TComponent>[0]
    : never
>(
  Component: TComponent,
  propsAreEqual?: (
    prevProps: Readonly<TProps>,
    nextProps: Readonly<TProps>,
  ) => boolean,
) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (React.memo(Component as any, propsAreEqual) as any) as TComponent &
    Pick<React.NamedExoticComponent<TProps>, 'displayName'>
