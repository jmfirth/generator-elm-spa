module App.Router where

import Hop

import App.Actions as Actions exposing (Action)


routes : List (String, Hop.Payload -> Action)
routes =
  [ ("/", Actions.ShowHome)
  , ("/counter", Actions.ShowCounter)
  ]


router : Hop.Router Action
router =
  Hop.new
    { routes = routes
    , notFoundAction = Actions.ShowNotFound
    }
