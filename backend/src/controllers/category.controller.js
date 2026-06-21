const {
    createCategory,
    getCategories,
    deleteCategory
} = require("../services/category.service");

// CREATE
const create = async (req, res) => {
    try {
        const category = await createCategory(req.user._id, req.body);

        res.status(201).json({
            success: true,
            category
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// GET ALL
const getAll = async (req, res) => {
    try {
        const categories = await getCategories(req.user._id);

        res.json({
            success: true,
            categories
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE
const remove = async (req, res) => {
    try {
        const category = await deleteCategory(req.user._id, req.params.id);

        res.json({
            success: true,
            message: "Deleted successfully",
            category
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    create,
    getAll,
    remove
};