export type MyEvents = {
  ON_INSTALLED: SimpleEvent;
  OPEN_OPTIONS: SimpleEvent;
  RELOAD_RETOOL_EMBED: SimpleEvent;
};

type Nothing = void | undefined | {};
type SimpleEvent = {
  in: Nothing;
  out: Nothing;
};
