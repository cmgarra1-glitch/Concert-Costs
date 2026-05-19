declare module "react-simple-maps" {
  import type { ReactNode, CSSProperties } from "react";

  export type Geography = {
    rsmKey: string;
    [key: string]: unknown;
  };

  export function ComposableMap(props: {
    projection?: string;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
  }): JSX.Element;

  export function Geographies(props: {
    geography: string | object;
    children: (args: { geographies: Geography[] }) => ReactNode;
  }): JSX.Element;

  export function Geography(props: {
    geography: Geography;
    fill?: string;
    className?: string;
    stroke?: string;
    style?: Record<string, { outline?: string; fill?: string }>;
  }): JSX.Element;

  export function Marker(props: {
    coordinates: [number, number];
    onClick?: () => void;
    children?: ReactNode;
  }): JSX.Element;
}
