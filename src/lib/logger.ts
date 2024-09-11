export const log = (...args: unknown[]) => {
  console.log(
    "%cAppEmbedderForRetool",
    "background-color:rgb(248,249,250);color:#000;font-size:11px;padding:0 5px;border-radius:10px;",
    ...args
  );
};
