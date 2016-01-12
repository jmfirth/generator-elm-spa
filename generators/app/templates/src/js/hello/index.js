import { hello } from './hello'

Elm.Native.Hello = Elm.Native.Hello || {}
Elm.Native.Hello.make = (elm) => {
  elm.Native = elm.Native || {};
  elm.Native.Hello = elm.Native.Hello || {};
  if (elm.Native.Hello.values) return elm.Native.Hello.values;

  return { hello: hello() }
}
