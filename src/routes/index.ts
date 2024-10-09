import { Router } from "express";

import brandRoutes from "./brands";
import hotelRoutes from "./hotels";

const rootRouter: Router = Router();

rootRouter.use("/hotel", hotelRoutes);

rootRouter.use("/brand", brandRoutes);

export default rootRouter;
