import React, {Component} from 'react';
import RecipesPage from "./pages/recipes";
import UpdateRecipeRage from "./pages/updateRecipe";
import HisroryRecipePage from "./pages/historyRecipe";
import AddRecipe from "./pages/addRecipe";
//import './App.css';

class App extends Component {

  state = {
    page: "recipes",
    data:{}
  }

  showPage(page, data = {}) {
    this.setState({
      page,
      data
    })
  };

  render() {
    switch (this.state.page) {
      case "recipes":
        return (
          <RecipesPage
            pageHandler={(page, data) => {
              this.showPage(page, data);
            }}
          />
        )
      case "updateRecipe":
        return(
          <UpdateRecipeRage
            recipe={this.state.data}
            pageHandler={page => {
              this.showPage(page);
            }}
          />
        ) 

      case "historyRecipe":
        return(
          <HisroryRecipePage
            recipe={this.state.data}
            pageHandler={page => {
              this.showPage(page);
          }}
          />
        )  
      case "addRecipe":
        return(
          <AddRecipe 
            pageHandler={page => {
              this.showPage(page);
            }}
          />
        )   
    }
  }



}

export default App;
