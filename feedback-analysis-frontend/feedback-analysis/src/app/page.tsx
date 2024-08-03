'use client'
import React, { useState } from 'react'
import { Feedback } from '@/app/types/types'
import { getAllFeedbacks, createFeedback } from '@/app/api/api'

const Homepage = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [hasLoaded, setHasLoaded] = useState<boolean>(false)
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false)
  const [newFeedback, setNewFeedback] = useState({
    userId: '',
    feedbackInput: '',
  })

  const handleListFeedbacks = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await getAllFeedbacks()
      setFeedbacks(data)
      setLoading(false)
      setHasLoaded(true)
    } catch (err) {
      setError('Failed to show feedbacks')
    }
  }

  const handleShowForm = () => {
    setIsFormVisible(!isFormVisible)
    if (!isFormVisible) {
      handleListFeedbacks()
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewFeedback((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await createFeedback(newFeedback)
      setNewFeedback({ userId: '', feedbackInput: '' })
      setIsFormVisible(false)
      await handleListFeedbacks()
    } catch (err) {
      setError('Failed to create feedback')
    }
  }

  return (
    <div className="homepage-container">
      <h1>Feedbacks</h1>
      <div className="button-group">
        <button onClick={handleShowForm} className="btn-primary">
          {isFormVisible ? 'Cancel' : 'Add Feedbacks'}
        </button>
        <button
          onClick={handleListFeedbacks}
          disabled={loading}
          className="btn-primary"
        >
          {loading ? 'Loading...' : 'List Feedbacks'}
        </button>
      </div>
      {isFormVisible ? (
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="userId">User Name</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={newFeedback.userId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="feedbackInput">Feedback</label>
            <input
              type="text"
              id="feedbackInput"
              name="feedbackInput"
              value={newFeedback.feedbackInput}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </form>
      ) : (
        <>
          {error && <p className="error-message">{error}</p>}
          {!loading && hasLoaded && feedbacks.length === 0 && (
            <p>No feedbacks available.</p>
          )}
          {feedbacks.length > 0 && (
            <table className="feedback-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Feedback</th>
                  <th>Sentiment</th>
                  <th>Summary</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback) => (
                  <tr key={feedback._id}>
                    <td>{feedback.userName}</td>
                    <td>{feedback.feedbackInput}</td>
                    <td>{feedback.sentimentEvaluation?.label}</td>
                    <td>{feedback.summaryEvaluation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  )
}

export default Homepage
