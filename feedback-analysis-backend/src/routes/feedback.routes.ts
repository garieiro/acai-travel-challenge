import {Router} from 'express';
import {
    createFeedback,
    deleteFeedback,
    getAllFeedbacks,
    getFeedbackById,
    updateFeedback
} from "../controllers/feedback.controllers";

const router = Router();

router.post('/feedback/create', createFeedback)
router.get('/feedbacks', getAllFeedbacks)
router.get('/feedback/:id', getFeedbackById)
router.put('/feedback/update/:id', updateFeedback)
router.delete('/feedback/delete/:id', deleteFeedback)

export default router;