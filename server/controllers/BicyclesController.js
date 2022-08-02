import express from "express";
import BicyclesService from "../services/BicyclesService.js";

const BicyclesController = () => {
    const url = "/bycycles";
    const router = express.Router();

    router.get(url, async (req, res, next) => {

        let json = null;

        try {
            json = await BicyclesService.getDeptno();
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    return router;
};

export default BicyclesController;
