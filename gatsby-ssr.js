export { wrapRootElement } from './src/apollo/wrap-root-element';

export const shouldUpdateScroll = ({
  routerProps: { location },
}) => {

  return window.scrollTo(0, 0)
}