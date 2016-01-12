module Hello (hello) where

import Native.Hello

hello : String
hello = Native.Hello.hello
