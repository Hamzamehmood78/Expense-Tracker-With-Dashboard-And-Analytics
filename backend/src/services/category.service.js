const Category = require("../models/category.model");

// CREATE CATEGORY
const createCategory = async (userId, data) => {
    const existing = await Category.findOne({
        user: userId,
        name: data.name,
        type: data.type
    });

    if (existing) {
        throw new Error("Category already exists");
    }

    const category = await Category.create({
        user: userId,
        ...data
    });

    return category;
};

// GET ALL
const getCategories = async (userId) => {
    return await Category.find({ user: userId });
};

// DELETE
const deleteCategory = async (userId, categoryId) => {
    const category = await Category.findOneAndDelete({
        _id: categoryId,
        user: userId
    });

    if (!category) {
        throw new Error("Category not found");
    }

    return category;
};

module.exports = {
    createCategory,
    getCategories,
    deleteCategory
};