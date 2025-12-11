import express from 'express';

import { registerNewDevice, getDevices } from '../controllers/device.controllers.js';

const router= express.Router();

router.post("/register", registerNewDevice);

router.get("/get",getDevices);

export default router;

