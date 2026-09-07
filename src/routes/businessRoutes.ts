import { Router } from "express";
import { businessInfo, businessRewards, businessTiers, createBusiness, activateTrackingSystem } from "../controllers/businessController.js";
import { authStatus } from "../middleware/authStatus.js";
import {businessStatus} from '../middleware/businessStatus.js';


const router = Router();

router.use(authStatus, businessStatus);
router.get('/info', businessInfo);
router.get('/rewards', businessRewards);
router.get('/tiers', businessTiers);

router.post('/create-business', createBusiness);
router.post('/activate-tracking-system', activateTrackingSystem);

export default router;