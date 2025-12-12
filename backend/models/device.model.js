import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema({
    deviceID:{
        type: String,
        required: true
    },
    isOnline:{
        type:Boolean,
        default: false
    },
    lastupdate:{
        type: Number,
        required: true,
        default: 0},


    mohtionsensor:{
        type: Number,
        required: true,
        default: 0
    },

    lasersensor:{
        type: Number,
        required: true,
        default: 0
        
    },

    pirsensor:{
        type: Number,
        required: true,
        default: 0
    
    }

       
    
});

 const Device = mongoose.model('Device', DeviceSchema);

 export default Device;
 