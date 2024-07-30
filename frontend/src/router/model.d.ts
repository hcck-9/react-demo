declare namespace IRouteType {
  interface IMeta {
    pageTitle: string;
  }
  interface IRouter {
    path: string;
    element: React.LazyExoticComponent<() => JSX.Element>;
    meta?: IMeta;
    children?: IRouter[];
  }
}
