import { Router } from "express";
import { businessInfo, businessRewards, businessTiers, businessTrackingSystem } from "../controllers/dashboardController.js";
import { authStatus } from "../middleware/authStatus.js";


const router = Router();

router.use(authStatus)

router.get('/business-info', businessInfo);
router.get('/business-rewards', businessRewards);
router.get('/business-tiers', businessTiers);
router.get('/business-tracking-system', businessTrackingSystem);

export default router;