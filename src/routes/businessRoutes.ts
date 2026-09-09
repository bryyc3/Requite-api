import { Router } from "express";
import { businessInfo, businessRewards, tiers, createBusiness, toggleTrackingSystem, toggleTiers } from "../controllers/businessController.js";
import { authStatus } from "../middleware/authStatus.js";
import {businessStatus} from '../middleware/businessStatus.js';


const router = Router();

router.use(authStatus, businessStatus);
router.get('/info', businessInfo);
router.get('/rewards', businessRewards);
router.get('/tiers', tiers);

router.post('/create-business', createBusiness);
router.post('/toggle-tracking-system', toggleTrackingSystem);
router.post('/toggle-tiers', toggleTiers)

export default router;