import React from "react";

export const formatDate = date => {
    const time = new Date(date);
    return (
        time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate()
    );
};
export const Name = ({ name }) => <h2>{name}</h2>;
export const Ingredients = ({ ingredients }) =>
    ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>);
export const RecipeText = ({ recipeText }) => <p>{recipeText}</p>;
export const RecipeDate = ({ date }) => <p>{date}</p>;

export const Recipe = props => {
    const {name, ingredients, recipe, date, deleteRecipe, updateRecipe, getPreviosVersion } = props;

    return(
        <div>
            <div className="name">
                {name}
            </div>
            <div className="ingredients">
                {ingredients}
            </div>
            <div className="recipe">
                {recipe} 
            </div>
            <div className="date">
                {date}
            </div>

            <button
                onClick={() => {
                    deleteRecipe(props._id);
                }}
            >
                Delete
            </button>
            <button
                onClick={() => {
                    updateRecipe(props._id);    
                }}
            >
                Update
            </button>
            <button
                onClick={() => {
                    getPreviosVersion(props._id);    
                }}
            >
                History
            </button>

        </div>
    )
}

