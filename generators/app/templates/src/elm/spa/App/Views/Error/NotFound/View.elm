module App.Views.Error.NotFound.View (view) where

import Html exposing (Html, div, text)

view : Html
view =
  div [] [ text "Page not found." ]
