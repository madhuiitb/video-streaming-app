import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    title: String,
    filename: String,
    url: String,
    originalName: String, 
    status: {
        type: String,
        default: 'processing'
    },
    classification: {
        type: String,
        enum: ['safe', 'flagged'],
        default: 'safe'
    },
    progress: {
        type: Number,
        default: 0
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

export default mongoose.model('Video', videoSchema);