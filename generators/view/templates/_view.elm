module App.Views.Home.View where

import Signal exposing (Address)

import Html exposing (Html, div, text)
import Html.Attributes exposing (class)

import App.Views.Home.Actions as Actions exposing (Action)
import App.Views.Home.Models exposing (HomeView)


view : Address Action -> ViewModel -> Html
view address model =
  div [ class "view" ] [ text "View" ]
