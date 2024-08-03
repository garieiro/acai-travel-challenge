import mongoose, { Document, Schema } from "mongoose";

// Defining the Document interface
interface IFeedback extends Document {
    userId: string;
    feedbackInput: string;
    sentimentEvaluation: {
        label: string;
        score: number;
    };
    summaryEvaluation: string;
    createdAt: Date;
}

// Defining the Schema
const FeedbackSchema: Schema = new Schema({
    userId: {type: String, required: true},
    feedbackInput: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    sentimentEvaluation: {
        label: { type: String, required: true },
        score: { type: Number, required: true }
    },
    summaryEvaluation: {type: String, required: true}
});

// Create the model
const FeedbackModel = mongoose.model<IFeedback>('Feedback', FeedbackSchema);

export default FeedbackModel;