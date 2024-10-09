import { Router } from "express";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getSingleBrand,
  updateBrand,
} from "../controllers/brands";

const brandRoutes: Router = Router();

brandRoutes.post("/create-brand", createBrand);
brandRoutes.get("/get-all-brands", getAllBrands);
brandRoutes.get("/get-brand/:brandId", getSingleBrand);
brandRoutes.delete("/delete-brand/:brandId", deleteBrand);
brandRoutes.put("/update-brand/:brandId", updateBrand);

export default brandRoutes;
