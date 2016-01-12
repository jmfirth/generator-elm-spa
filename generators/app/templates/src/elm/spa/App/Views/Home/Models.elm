module App.Views.Home.Models (HomeView, emptyHomeView) where


type alias HomeView =
  { message: String
  }


emptyHomeView : HomeView
emptyHomeView =
  { message = ""
  }
