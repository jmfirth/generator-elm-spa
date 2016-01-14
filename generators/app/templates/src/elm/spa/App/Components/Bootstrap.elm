module App.Components.Bootstrap (navbar, container, panel) where

import Signal exposing (Address)
import List exposing (map)

import Html exposing (Html, nav, div, ul, li, a, span, button, text)
import Html.Attributes exposing (class, type', href, id)
import Html.Events exposing (onClick)

import App.Actions as Actions exposing (Action)


navbar : Address Action -> String -> List (String, String, Bool) -> Html
navbar address brand links =
  nav [ class "navbar navbar-inverse navbar-fixed-top" ]
    [ container True
      [ div [ class "navbar-header" ]
        [ button [ type' "button", class "navbar-toggle collapsed" ]
          [ span [ class "sr-only" ] [ text "Toggle navigation" ]
          , span [ class "icon-bar" ] [ text "" ]
          , span [ class "icon-bar" ] [ text "" ]
          , span [ class "icon-bar" ] [ text "" ]
          ]
        , a [ href "#", class "navbar-brand" ] [ text brand ]
        ]
      , div [ id "navbar", class "collapse navbar-collapse" ]
        [ ul [ class "nav navbar-nav" ]
          (List.map (\(title, url, active) -> navLink address url title active) links)
        ]
      ]
    ]


navLink : Address Action -> String -> String -> Bool -> Html
navLink address url title active =
  let
    highlight = if active then "active" else ""
  in
    li [ class highlight ] [ a [ onClick address (Actions.NavigateTo url) ] [ text title ] ]


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
