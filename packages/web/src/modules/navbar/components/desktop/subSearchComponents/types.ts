export type SubSearchProps = {
  children?: JSX.Element;
  index?: number;
  searchBarRef?: React.RefObject<HTMLDivElement>;
  dividerRefs: React.MutableRefObject<HTMLHRElement[]>;
  searchButtonRef?: React.RefObject<HTMLButtonElement>;
};
