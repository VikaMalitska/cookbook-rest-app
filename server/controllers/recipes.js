const koa = require("koa");
const Recipe = require("../db/modelRecipes");
const Archive = require("../db/modelArchive");
class RecipeController {
    async createOne(ctx) {
        try {
            const request = ctx.request.body;
            if (!request.ingredients || request.ingredients.length === 0) {
                ctx.body = {
                    success: false,
                    message: "Empty recipe!"
                };
                return;
            }
            if (!request.name) {
                request.name = "Recipe";
            }
            const newRecipe = await new Recipe({
                name: request.name,
                ingredients: request.ingredients,
                date: new Date()
            });
            const res = await newRecipe.save();
            ctx.body = {
                success: true,
                result: res
            };
        } catch (err) {
            ctx.body = {
                success: false,
                result: err
            };
        }
    }

    async getAllCurrentRecipe(ctx) {
        try {
            const res = await Recipe.find({});

            ctx.body = {
                success: true,
                result: res
            };
        } catch (err) {
            ctx.body = {
                success: false,
                result: err
            };
        }
    }

    async getArchiveBykeyId(ctx) {
        try {
            const keyId = ctx.params.keyId;
            const arrRecipes = await Archive.find({ keyId: keyId });
            const res = arrRecipes.sort((a, b) => {
                return a.date < b.date;
            });
            ctx.body = {
                success: true,
                result: res
            };
        } catch (err) {
            ctx.body = {
                success: false,
                result: err
            };
        }
    }

    async updateOne(ctx) {
        const req = ctx.request.body;
        if (!req._id || !req.ingredients) {
            ctx.body = {
                success: false,
                result: "Empty!"
            };
            return;
        }

        const archiveRecipe = new Archive({
            name: req.previosVersion.name,
            ingredients: req.previosVersion.ingredients,
            recipe: req.previosVersion.recipe,
            date: req.previosVersion.date,
            keyId: req._id
        });

        const resarchive = await archiveRecipe.save();

        const filter = { _id: req._id };
        const update = {
            ingredients: req.ingredients,
            recipe: req.recipe,
            date: new Date()
        };
        const resupdate = await Recipe.findOneAndUpdate(filter, update);

        if (!resupdate) {
            ctx.body = {
                success: false
            };
            return;
        }
        ctx.body = {
            success: true,
            resultUpdate: resupdate,
            resultArchive: resarchive
        };
    }

    async deleteRecipe(ctx) {
        const id = ctx.params.id;
        const removeCurrentRecipe = await Recipe.findOneAndRemove({ _id: id });
        const removeArchiveRecipe = await Archive.remove({ keyId: id });
        if (!removeCurrentRecipe) {
            ctx.body = {
                success: false,
                result: "id not found"
            };
            return;
        }
        ctx.body = {
            success: true,
            result: removeCurrentRecipe,
            archive: removeArchiveRecipe
        };
    }
}

module.exports = RecipeController;
