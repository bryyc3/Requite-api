import { Router } from "express";
import { businessInfo, businessRewards, businessTiers, businessTrackingSystem, createBusiness } from "../controllers/businessController.js";
import { authStatus } from "../middleware/authStatus.js";
import {businessStatus} from '../middleware/businessStatus.js';


const router = Router();

router.use(authStatus, businessStatus);
router.get('/info', businessInfo);
router.get('/rewards', businessRewards);
router.get('/tiers', businessTiers);
router.get('/tracking-system', businessTrackingSystem);

router.post('/create-business', createBusiness);

export default router;