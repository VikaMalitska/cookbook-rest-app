import React, { Component } from "react";
import { getPreviosVersionFromDb } from "../api";
import { Name, Ingredients, RecipeText, RecipeDate, formatDate  } from "../components/recipe";


class HisroryRecipePage extends Component{
        
    constructor(props){
        super(props)
        this.state = {
            list: [],
            recipe: props.recipe
        };
    }   

    async getPreviosVersion() {
        const keyId = this.state.recipe._id
        const result = await getPreviosVersionFromDb(keyId);
        const res = await result.json();
        const list = res.result;
        this.setState({ list });
    }

    componentDidMount(){
        this.getPreviosVersion()
    }
    render() {
        
        return (
            <div>
                {this.state.list.map(recipe => (
                   <div> 
                        <div className="name">
                            <Name name={recipe.name} />
                        </div>
                        <div className="ingredients">
                            <Ingredients ingredients={recipe.ingredients}/>
                        </div>
                        <div className="recipe">
                            <RecipeText recipeText={recipe.recipe}/>
                        </div>
                        <div className="date">
                            <RecipeDate date={formatDate(recipe.date)}/>
                        </div>
                    </div>
                        
                ))}
            </div>
        )
    }
}


export default HisroryRecipePage;

