module App.Views.Counter.View (view) where

import Signal exposing (Address)

import Html exposing (Html, div, h1, text)
import Html.Attributes exposing (class)

import App.Views.Counter.Actions as Actions exposing (Action)
import App.Views.Counter.Models exposing (CounterView)
import App.Components.Bootstrap exposing (container, panel)
import App.Components.Counter exposing (counter)


view : Address Action -> CounterView -> Html
view address counterView =
  let
    counterAddress = Signal.forwardTo address Actions.CounterAction
  in
    div [ class "counter-view" ]
      [ container False
        [ h1 [] [ text "Counter" ]
        , div [ class "row" ]
          [ div [ class "col-xs-3" ]
            [ panel "Counter" [ counter counterAddress counterView.counter ] ]
          ]
        ]
      ]
