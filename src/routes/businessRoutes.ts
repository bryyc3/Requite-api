import { Router } from "express";
import { authStatus } from "../middleware/authStatus.js";
import {businessStatus} from '../middleware/businessStatus.js';
import { businessInfo, createBusiness, toggleTrackingSystem } from "../controllers/business/info/businessInfoController.js";
import { businessRewards, createReward, deleteReward, updateReward } from "../controllers/business/reward/businessRewardController.js";
import { businessTiers, createNewTier, toggleTiers, updateTier } from "../controllers/business/tier/businessTierController.js";


const router = Router();

router.use(authStatus)
router.post('/create-business', createBusiness);

router.use(businessStatus);
router.get('/info', businessInfo);
router.get('/rewards', businessRewards);
router.get('/tiers', businessTiers);

router.post('/toggle-tracking-system', toggleTrackingSystem);
router.post('/toggle-tiers', toggleTiers);
router.post('/create-reward', createReward);
router.post('/create-tier', createNewTier);

router.put('/update-reward', updateReward);
router.put('/update-tier', updateTier)

router.delete('/delete-reward', deleteReward);

export default router;