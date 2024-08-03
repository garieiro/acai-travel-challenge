import {Request, Response} from 'express';
import Feedback from "../models/feedback.models";
import llmAgent from "../HuggingfaceService/huggingfaceService";

// Create a new Feedback
export const createFeedback = async (req: Request, res: Response) => {
    try {
        const feedbackInput = req.body

        if(!feedbackInput) {
            return res.status(400).json({message: 'Body is required!!'})
        }

        const {sentiment, summary} = await llmAgent(feedbackInput.feedbackInput);

        const feedback = new Feedback({
            userName: feedbackInput.userName,
            feedbackInput: feedbackInput.feedbackInput,
            sentimentEvaluation: {
                label: sentiment.label,
                score: sentiment.score
            },
            summaryEvaluation: summary[0]?.summary_text || ''
        });

        await feedback.save();
        res.status(201).json(feedback)
    }catch(error){
        if(error instanceof Error) {
            res.status(400).json({error: error.message})
        } else{
            res.status(500).json({error: 'An unexpected error occured!!'})
        }
    }
}

// List all Feedbacks
export const getAllFeedbacks = async (req: Request, res: Response) => {
    try {
        const feedbacks = await Feedback.find();

        res.status(200).json(feedbacks)
    }catch(error){
        if(error instanceof Error) {
            res.status(400).json({error: error.message})
        } else{
            res.status(500).json({error: 'An unexpected error occured!!'})
        }
    }
}

// Get a Feedback by ID
export const getFeedbackById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if(!id) {
            return res.status(400).json({message: 'Id parameter is required!!'})
        }

        const feedback = await Feedback.findById(id);

        if(!feedback) {
            return res.status(404).json({message: 'Feedback not found!!'})
        }

        res.status(200).json(feedback)
    }catch(error){
        if(error instanceof Error) {
            res.status(400).json({error: error.message})
        } else{
            res.status(500).json({error: 'An unexpected error occured!!'})
        }
    }
}

// Update a Feedback
export const updateFeedback = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const body = req.body

        if(!id || !body) {
            return res.status(400).json({message: 'Id and body is required!!'})
        }

        const feedback = await Feedback.findByIdAndUpdate(id, body, {new: true});
        if(!feedback) {
            return res.status(404).json({message: 'Feedback not found!!'})
        }
        res.status(200).json(feedback)
    }catch(error){
        if(error instanceof Error) {
            res.status(400).json({error: error.message})
        } else{
            res.status(500).json({error: 'An unexpected error occured!!'})
        }
    }
}

// Delete a Feedback
export const deleteFeedback = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if(!id) {
            return res.status(400).json({message: 'Id is required!!'})
        }
        const feedback = await Feedback.findByIdAndDelete(id);

        if(!feedback) {
            return res.status(404).json({message: 'Feedback not found!!'})
        }
        res.status(200).json({ message: 'Feedback successfully deleted!!'})
    }catch(error){
        if(error instanceof Error) {
            res.status(400).json({error: error.message})
        } else{
            res.status(500).json({error: 'An unexpected error occured!!'})
        }
    }
}