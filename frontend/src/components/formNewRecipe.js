import React, {Component} from "react";


class NewRecipe extends React.Component {
    constructor(props) {
      super(props);
      console.log(props.recipe.ingredients);
      this.state = {
        ingredients: props.recipe.ingredients,
        recipeText: props.recipe.recipe
      };
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        console.log("You are submitting " + this.state.recipeText + " " + this.state.ingredients);
      }

    changeHandlerIngredient = (event) => {
      this.setState({ingredients: this.state.ingredients[event.target.name] = event.target.value});
    }  

    changeHandlerRecipe = (event) => {
        this.setState({recipeText: event.target.value});
    }
    render() {
        return (
            <div>
            <form onSubmit={this.mySubmitHandler}>
                {
                    this.state.ingredients.map((ingredient, index) => (
                        <input 
                          value={ingredient} 
                          name={index} 
                          onChange={this.changeHandlerIngredient}
                        />
                    )),
                    <input
                      className="form-control"
                      value={this.state.recipeText} 
                      onChange={this.changeHandlerRecipe} 
                    />
                }
            </form>
            </div>
        );
    }
  }



export default NewRecipe;