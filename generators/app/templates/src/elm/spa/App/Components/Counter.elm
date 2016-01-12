module App.Components.Counter (counter, update, Counter, emptyCounter, Action) where

import Signal exposing (Address)
import Effects exposing (Effects)

import Html exposing (Html, div, span, button, i, text)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)


type alias Counter = { value: Int }


emptyCounter : Counter
emptyCounter = { value = 0 }


type Action
  = Increment
  | Decrement
  | Reset
  | NoOp


counter : Address Action -> Counter -> Html
counter address counter =
  div [ class "row counter" ]
    [ div [ class "col-xs-3" ] []
    , div [ class "col-xs-1" ] [ text (toString counter.value) ]
    , div [ class "col-xs-2" ]
      [ button [ class "button", onClick address Increment ]
        [ i [ class "fa fa-plus" ] [] ]
      ]
    , div [ class "col-xs-2" ]
      [ button [ class "button", onClick address Decrement ]
        [ i [ class "fa fa-minus" ] [] ]
      ]
    , div [ class "col-xs-2" ]
      [ button [ class "button", onClick address Reset ]
        [ i [ class "fa fa-refresh" ] [] ]
      ]
    , div [ class "col-xs-2" ] []
    ]


update : Action -> Counter -> (Counter, Effects Action)
update action counter =
  case Debug.watch "App.Components.Counter.Action" action of
    Increment ->
      ({counter | value = counter.value + 1}, Effects.none)
    Decrement ->
      ({counter | value = counter.value - 1}, Effects.none)
    Reset ->
      (emptyCounter, Effects.none)
    _ ->
      (counter, Effects.none)
