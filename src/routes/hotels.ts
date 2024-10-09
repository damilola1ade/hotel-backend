import { Router } from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getSingleHotel,
  updateHotel,
} from "../controllers/hotels";

const hotelRoutes: Router = Router();

hotelRoutes.post("/create-hotel", createHotel);
hotelRoutes.get("/get-all-hotels", getAllHotels);
hotelRoutes.get("/get-hotel/:hotelId", getSingleHotel);
hotelRoutes.delete("/delete-hotel/:hotelId", deleteHotel);
hotelRoutes.put("/update-hotel/:hotelId", updateHotel);

export default hotelRoutes;
