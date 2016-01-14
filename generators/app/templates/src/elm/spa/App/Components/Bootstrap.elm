module App.Components.Bootstrap (container, panel) where

import Html exposing (Html, nav, div, ul, li, a, span, button, text)
import Html.Attributes exposing (class, type', href, id)


container : Bool -> List Html -> Html
container fluid content =
  let
    container = if fluid then "container-fluid" else "container"
  in
    div [ class container ]
      [ div [ class "row"]
        [ div [ class "col-xs-12 layout-content" ] content ]
      ]


panel : String -> List Html -> Html
panel title body =
  div [ class "panel panel-default" ]
    [ div [ class "panel-heading" ]
      [ div [ class "panel-title" ] [ text title ] ]
    , div [ class "panel-body" ] body
    ]
