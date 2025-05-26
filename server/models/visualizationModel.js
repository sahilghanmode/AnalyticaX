import mongoose from 'mongoose';

const visualizationSchema = new mongoose.Schema({
    file: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        required: true
    },
    chartType: {
        type: String,
        required: true
    },
    is3d: {
        type: Boolean, 
        default: false
    },
    xAxisKey: { 
        type: String, 
        required: true 
    },
    yAxisKey: { 
        type: String, 
        required: true 
    }, 
    zAxisKey: { 
        type: String 
    }, 
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

const Visualization=mongoose.model('Visualization',visualizationSchema)

export default Visualization