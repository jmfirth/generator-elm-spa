module App.Components.<%= name %>where

import Signal exposing (Address)
import Effects exposing (Effects)

import Html exposing (Html, div, text)


type alias <%= name %> = { value: Int }


empty<%= name %> : <%= name %>
empty<%= name %> = { value = 0 }


type Action
  | NoOp


<%= name %> : Address Action -> <%= name %> -> Html
<%= name %> address <%= name %> =
  div [ class "component" ] [ text "Component" ]


update : Action -> <%= name %> -> (<%= name %>, Effects Action)
update action <%= name %> =
  case Debug.watch "App.Components.<%= name %>.Action" action of
    _ ->
      (counter, Effects.none)
