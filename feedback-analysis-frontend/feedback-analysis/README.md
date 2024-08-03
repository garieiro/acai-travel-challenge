## Feedback Analysis

I developed a simple application using Next.js, React and TypeScript. The application has a basic interface with a title and two main buttons:

- Add Feedback: Allows the user to add new feedback. To do this, you need to enter the user's name and the feedback itself. After submission, feedback is processed and stored.

- List Feedbacks: Displays a table with all added feedback. Each entry in the table includes the user name, feedback text, sentiment evaluation, and an automatically generated summary.

### Functionalities
- Add Feedback: User can enter a name and feedback text. This feedback is sent to the server, where it is analyzed and stored.
- List Feedbacks: Shows a table with all stored feedback. The table includes information such as user name, feedback text, sentiment rating, and a feedback summary.
### Technologies Used
- Next.js: React framework for server-side rendering and static website generation.
- React: Library for building the user interface.
- TypeScript: Chosen language


## Run the development server:

You need to create a .env file where the key will have to be entered:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

Then just run:

```bash
npm run dev
```
Open [http://localhost:3001](http://localhost:3000) with your browser to see the result.
