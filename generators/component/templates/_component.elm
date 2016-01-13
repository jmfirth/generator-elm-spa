module App.Components.<%= ProperName %> where

import Signal exposing (Address)
import Effects exposing (Effects)

import Html exposing (Html, div, text)
import Html.Attributes exposing (class)


type alias <%= ProperName %> = { value: Int }


empty<%= ProperName %> : <%= ProperName %>
empty<%= ProperName %> = { value = 0 }


type Action
  = NoOp


<%= camelName %> : Address Action -> <%= ProperName %> -> Html
<%= camelName %> address <%= camelName %> =
  div [ class "component" ] [ text "Component" ]


update : Action -> <%= ProperName %> -> (<%= ProperName %>, Effects Action)
update action <%= camelName %> =
  case Debug.watch "App.Components.<%= ProperName %>.Action" action of
    _ ->
      (<%= camelName %>, Effects.none)
