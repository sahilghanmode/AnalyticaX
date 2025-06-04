import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
    }
  ],
  visualizations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Visualization',
    }
  ]
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

export default Project;
