export const log = (...args: unknown[]) => {
  console.log(
    "%cRetoolEmbedder",
    "background-color:#CCC;color:#FFF;font-size:11px;padding:0 5px;border-radius:10px;",
    ...args
  );
};
