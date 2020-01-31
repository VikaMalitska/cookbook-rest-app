import React, { Component } from "react";
import { updateRecipeInDb } from "../api";


class UpdateRecipeRage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ingredients: props.recipe.ingredients,
            recipeText: props.recipe.recipe,
            _id: props.recipe._id
        };
    }

    addExtraIngregient = () => {
        const index = this.state.ingredients.length;
        this.state.ingredients.push({});
        this.state.ingredients[index] = "";
        this.setState({ ingredients: this.state.ingredients });
    };

    filterIngredients = () => {
        this.state.ingredients = this.state.ingredients.filter(item => !!item);
    };

    changeHandlerIngredient = event => {
        event.preventDefault();
        this.state.ingredients[event.target.name] = event.target.value;
        this.setState({ ingredients: this.state.ingredients });
    };

    changeHandlerRecipe = event => {
        this.setState({ recipeText: event.target.value });
    };

    render() {
        const arrIngred = this.state.ingredients;
        const { pageHandler } = this.props;
        return (
            <div>
                <form>
                    {arrIngred.map((ingredient, index) => (
                        <input
                            value={ingredient}
                            name={index}
                            onChange={this.changeHandlerIngredient}
                        />
                    ))}
                    <input
                        type="button"
                        value="extraIngred"
                        onClick={() => {
                            this.addExtraIngregient();
                        }}
                    />
                    <input
                        value={this.state.recipeText}
                        onChange={this.changeHandlerRecipe}
                    />
                    <input
                        type="submit"
                        onClick={() => {
                            this.filterIngredients();
                            updateRecipeInDb({
                                _id: this.state._id,
                                ingredients: this.state.ingredients,
                                recipe: this.state.recipeText
                            }).then(() => {
                                pageHandler("recipes");
                            });
                        }}
                    />
                </form>
            </div>
        );
    }
}

export default UpdateRecipeRage;
