import React, { Component } from "react";
import { addRecipeInDb } from "../api";

class AddRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            ingredients: [],
            recipeText: "",
            ingredient: ""
        };
    }

    filterIngredients = () => {
        this.state.ingredients = this.state.ingredients.filter(item => !!item);
    };
    handlAddIngredients = event => {
        event.preventDefault();
        const item = this.state.ingredient;
        this.state.ingredients.push(item);
        this.setState({
            ingredients: this.state.ingredients,
            ingredient: ""
        });
    };

    handlAddRecipeText = event => {
        event.preventDefault();
        this.setState({
            recipeText: event.target.value
        });
    };

    handlChangeIngredient = event => {
        this.setState({
            ingredient: event.target.value
        });
    };

    handlChangeName = event => {
        event.preventDefault();
        this.setState({
            name: event.target.value
        });
    };
    render() {
        let arrIngreg = this.state.ingredients;
        const { pageHandler } = this.props;
        return (
            <div>
               
                    <input
                        value={this.state.name}
                        onChange={this.handlChangeName}
                    />
                    <form>
                        <input type = "text"
                            value={this.state.ingredient}
                            onChange={this.handlChangeIngredient}
                            //onSubmit={this.handlAddIngredients}
                        />
                        <input type="submit"
                            value="add"
                            onClick={this.handlAddIngredients} 
                        />
                    </form>
                    {/* <input 
                        onClick={this.handlAddIngredients} /> */}
                    <input
                        value={this.state.recipeText}
                        onChange={this.handlAddRecipeText}
                    />
                    <input
                        value="create recipe"
                        type="submit"
                        onClick={() => {
                            this.filterIngredients();
                        
                            addRecipeInDb({
                                name: this.state.name,
                                ingredients: this.state.ingredients,
                                recipe: this.state.recipeText
                            }).then(() => {
                                pageHandler("recipes");
                            });
                        }}
                    />
                
                <div>
                    <ul>
                        {arrIngreg.map(item => (
                            <li>{item}</li>
                        ))}
                    </ul>
                    <p>{this.state.recipeText}</p>
                </div>
            </div>
        );
    }
}

export default AddRecipe;
