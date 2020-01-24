const Router = require("koa-router");
const router = new Router();
const RecipeController = require("./controllers/recipes");

const recipeController = new RecipeController();

router.post("/recipe", recipeController.createOne);
router.get("/recipes", recipeController.getAllCurrentRecipe);
router.get("/recipes/archive/:keyId", recipeController.getArchiveBykeyId);
router.post("/recipe/change", recipeController.updateOne);
router.get("/recipe/delete/:id", recipeController.deleteRecipe);

router.get ("/", async (ctx) => {
    ctx.body = "Router up!"
});

module.exports = router;

