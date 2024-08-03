import axios from 'axios'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const createFeedback = async (feedback: {
  userId: string
  feedbackInput: string
}) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/feedback/create`, feedback)
    return response.data
  } catch (error) {
    console.error('Error creating feedback:', error)
    throw new Error('Failed to create feedback')
  }
}

export const getAllFeedbacks = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/feedbacks`)
    return response.data
  } catch (error) {
    console.error('Error fetching feedbacks:', error)
    throw new Error('Failed to fetch feedbacks')
  }
}
