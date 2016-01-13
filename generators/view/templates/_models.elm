module App.Views.<%= ProperName %>.Models (<%= ProperName %>View, empty<%= ProperName %>View) where


type alias <%= ProperName %>View =
  { message: String
  }


empty<%= ProperName %>View : <%= ProperName %>View
empty<%= ProperName %>View =
  { message = ""
  }
