## Feedback Analysis
The project's backend is built using Node.js and Express, with the MongoDB database. It provides RESTful APIs for:

- creating (createFeedback);
- listing (getAllFeedbacks);
- searching (getFeedbackById);
- updating (updateFeedback);
- removing (deleteFeedback);

### Functionalities
The application has key functionalities related to sentiment analysis and feedback summarization using Hugging Face language models. 
Below is a detailed explanation of each of these features:

- Sentiment Analysis: The analyzeSentiment function is responsible for evaluating the sentiment of a provided text. It uses Hugging Face's pre-trained 
distilbert-base-uncased-finetuned-sst-2-english model to categorize text as positive or negative.
  1. Input: A text that represents user feedback.
  2. Output: The predominant sentiment (positive or negative) and the associated score.

- Feedback Summarization: The summarizeFeedBack function uses the Hugging Face knkarthick/MEETING_SUMMARY model to summarize feedback text into a 
defined number of words. Depending on the feeling identified, the feedback can be summarized with a focus on the negative aspects.
  1. Input: A feedback text that needs to be summarized.
  2. Output: A brief summary of the original text.

- llmAgent function integrates sentiment analysis and summarization features to process complete feedback. Based on the identified sentiment, it calls the 
summarization function with a specific prompt.
   1. Input: A user-supplied feedback text.
   2. Output: An object containing the identified sentiment and feedback summary.

### Technologies Used
- TypeScript
- MongoDB (via MongoDB Atlas)
- Mongoose
- Hugging Face API
- Node.js
- Express
- Postman (to test APIs)


## Run the development server:

You need to create a .env file where the key will have to be entered:
- I named the cluster: acai-travel-challenge
```bash
MONGODB_URI=mongodb+srv://<username>:<password>@acai-travel-challenge.9fpz3op.mongodb.net/<databaseName>?retryWrites=true&w=majority
PORT=3000
HUGGING_FACE_API_KEY=<VALUE>
```

Then just run:

```bash
npm run dev
```
If you view the logs in the console:
- Connected to DB.
- Server is running on port: 3000.

It's because the connection was successful
