import { Router } from "express";
import { businessInfo, businessRewards, businessTiers, businessTrackingSystem, createBusiness } from "../controllers/businessController.js";
import { authStatus } from "../middleware/authStatus.js";
import {businessStatus} from '../middleware/businessStatus.js';


const router = Router();

router.use(authStatus);
router.get('/', businessStatus);
router.get('/info', businessStatus, businessInfo);
router.get('/rewards', businessStatus, businessRewards);
router.get('/tiers', businessStatus, businessTiers);
router.get('/tracking-system', businessStatus, businessTrackingSystem);

router.post('/create-business', createBusiness);

export default router;