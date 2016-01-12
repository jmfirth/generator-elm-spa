module App.App where

import StartApp
import Html exposing (Html)
import Effects exposing (Effects, Never)
import Task exposing (Task)

import App.Models exposing (Site, emptySite)
import App.Actions as Actions exposing (Action)
import App.Router exposing (router)
import App.View exposing (view)
import App.Update exposing (update)


init : (Site, Effects Action)
init =
  (emptySite router.payload, Effects.none)


app : StartApp.App Site
app =
  StartApp.start {
    init = init,
    update = update,
    view = view,
    inputs = [router.signal]
  }


main: Signal Html
main =
  app.html


port tasks : Signal (Task Never ())
port tasks =
  app.tasks


port routeRunTask : Task () ()
port routeRunTask =
  router.run
