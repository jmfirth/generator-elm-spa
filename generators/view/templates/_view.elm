module App.Views.<%= ProperName %>.View where

import Signal exposing (Address)

import Html exposing (Html, h1, text)
import Html.Attributes exposing (class)

import App.Views.<%= ProperName %>.Actions as Actions exposing (Action)
import App.Views.<%= ProperName %>.Models exposing (<%= ProperName %>View)


view : Address Action -> <%= ProperName %>View -> Html
view address <%= camelName %> =
  let
    title = "<%= ProperName %>"
  in
    h1 [ class "<%= hyphenName %>" ] [ text title ]
