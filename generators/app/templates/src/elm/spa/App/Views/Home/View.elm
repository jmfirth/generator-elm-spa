module App.Views.Home.View (view) where

import Signal exposing (Address)

import Html exposing (Html, div, h1, text)
import Html.Attributes exposing (class)

import App.Views.Home.Actions as Actions exposing (Action)
import App.Views.Home.Models exposing (HomeView)
import App.Components.Bootstrap exposing (container)
import Hello exposing (hello)


view : Address Action -> HomeView -> Html
view address homeView =
  div [ class "home-view" ]
    [ container False
      [ h1 [] [ text hello ] ]
    ]
