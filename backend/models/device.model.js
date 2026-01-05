import mongoose from 'mongoose';


const DeviceSchema = new mongoose.Schema({
    deviceID:{
        type: String,
        required: true
    },
    isOnline:{
        type: Boolean,
        default: false
    },
    lastUpdate:{
        type: Number,
        required: true,
        default: 0
    },
    owner:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    UltraSonicSensor:{
        type: Number,
        required: true,
        default: 0
    },

    IrSensor:{
        type: Boolean,
        default: false
    },
    Camera:{
        type: "String",
        default: ""
    },
    
});

const Device = mongoose.model('Device', DeviceSchema);

export default Device;