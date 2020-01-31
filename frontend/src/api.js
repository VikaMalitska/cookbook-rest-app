export const getRecipesFromDb = () =>
    fetch("/recipes", {
        method: "GET"
    });

export const deleteRecipeFromDb = (keyId) =>
    fetch(`/recipe/delete/${keyId}`, {
        method: "Get"
    });

export const updateRecipeInDb = (data) => 
    fetch('/recipe/change', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

export const addRecipeInDb = (data) => 
    fetch('/recipe', {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

export const getPreviosVersionFromDb = (keyId) => 
    fetch(`/recipes/archive/${keyId}`, {
        method: "Get"
    });