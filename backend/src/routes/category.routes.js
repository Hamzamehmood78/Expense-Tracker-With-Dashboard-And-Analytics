const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const {
    create,
    getAll,
    remove
} = require("../controllers/category.controller");

const router = express.Router();

router.use(authMiddleware);

router.post("/", create);
router.get("/", getAll);
router.delete("/:id", remove);

module.exports = router;