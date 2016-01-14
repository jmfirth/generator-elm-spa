module App.Components.Navbar (navbar) where

import Signal exposing (Address)
import List exposing (map)

import Html exposing (Html, nav, div, ul, li, a, span, button, text)
import Html.Attributes exposing (class, type', href, id)
import Html.Events exposing (onClick)

import App.Actions as Actions exposing (Action)
import App.Components.Bootstrap exposing (container)


navbar : Address Action -> Html -> List (String, String, Bool) -> Html
navbar address brand links =
  nav [ class "navbar navbar-default navbar-fixed-top" ]
    [ container True
      [ div [ class "navbar-header" ]
        [ button [ type' "button", class "navbar-toggle collapsed" ]
          [ span [ class "sr-only" ] [ text "Toggle navigation" ]
          , span [ class "icon-bar" ] [ text "" ]
          , span [ class "icon-bar" ] [ text "" ]
          , span [ class "icon-bar" ] [ text "" ]
          ]
        , a [ href "#", class "navbar-brand" ] [ brand ]
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
