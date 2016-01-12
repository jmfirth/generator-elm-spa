module App.Views.Home.Models where


type alias ViewModel =
  { message: String
  }


emptyViewModel : ViewModel
emptyViewModel =
  { message = ""
  }
