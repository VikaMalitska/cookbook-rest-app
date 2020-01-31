import React, { Component } from "react";
import {Recipe, Name, Ingredients, RecipeText, RecipeDate, formatDate}  from "../components/recipe";
import { getRecipesFromDb, deleteRecipeFromDb } from "../api";    

class RecipesPage extends Component {
    state = {
        list: []
    };

    async getRecipes() {
        const result = await getRecipesFromDb();
        const res = await result.json();
        const list = res.result;
        this.setState({ list });
    }

    async deleteRecipe(_id) {
        const result = await deleteRecipeFromDb(_id);
        const res = await result.json();
        if (res.success) {
            const list = this.state.list.filter(recipe => recipe._id !== _id);
            this.setState({ list });
        }
    }

    componentDidMount() {
        this.getRecipes();
    }

    render() {
        const { pageHandler } = this.props;
        return (
            <div className="app">
                <div>
                <button
                    onClick={() => {
                        pageHandler("addRecipe");
                    }}
                >
                    New recipe
                </button>
                    {this.state.list.map(recipe => (
                        <Recipe
                            {...recipe}
                            key={recipe.id}
                            name={<Name name={recipe.name} />}
                            ingredients={
                                <Ingredients ingredients={recipe.ingredients} />
                            }
                            recipeText={
                                <RecipeText recipeText={recipe.recipe} />
                            }
                            date={<RecipeDate date={formatDate(recipe.date)} />
                            }
                            deleteRecipe = {_id => {
                                this.deleteRecipe(_id);
                            }}
                            getPreviosVersion = { () => {
                                pageHandler("historyRecipe", recipe);
                            }}
                            updateRecipe = { () => {
                                pageHandler("updateRecipe", recipe);
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default RecipesPage;
