export interface Feedback {
  _id: string
  userName: string
  feedbackInput: string
  sentimentEvaluation: {
    label: string
    score: number
  }
  summaryEvaluation: string
}
