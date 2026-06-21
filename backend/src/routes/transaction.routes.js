const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const {
    create,
    getAll,
    remove,
    analytics,
    categoryStats,
    dashboard,
} = require("../controllers/transaction.controller");

const router = express.Router();

// all routes protected
router.use(authMiddleware);

router.post("/", create);
router.get("/", getAll);
router.delete("/:id", remove);
router.get("/analytics", analytics);
router.get("/categories", categoryStats);
router.get("/dashboard", dashboard);

module.exports = router;