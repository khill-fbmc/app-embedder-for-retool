export type MyEvents = {
  GET_INNER_HTML: {
    in: {
      selector: string;
    };
    out: string;
  };
};
