import axios from 'axios';

const apiKey = process.env.HUGGING_FACE_API_KEY;
const apiUrlSentiment = 'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english';
const apiUrlSummary = 'https://api-inference.huggingface.co/models/knkarthick/MEETING_SUMMARY';

const customPrompt = (text: string) => {
    return `Please summarize the following text in exactly 10 words. If you can't summarize it in exactly 10 words, aim to be as close as possible to 10 words:\n\n${text}`
}

const analyzeSentiment = async (text: string) => {
    try {
        const response = await axios.post(
            apiUrlSentiment,
            { inputs: text },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const [results] = response.data;
        return results.reduce((prev: any, current: any) => (prev.score > current.score ? prev : current));

    } catch (error) {
        console.error('Error evaluating text:', error);
        throw new Error('Failed to evaluate text');
    }
};

const sumarizeFeedBack = async (text: string) => {
    try {
        const response = await axios.post(
            apiUrlSummary,
            { inputs: customPrompt(text) },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data
    } catch (error) {
        console.error('Error evaluating text:', error);
        throw new Error('Failed to evaluate text');
    }
};

const llmAgent = async (text: string) => {
    const sentiment = await analyzeSentiment(text);
    let summary;

    if(sentiment.label === 'NEGATIVE') {
        summary = await sumarizeFeedBack(`Summarize the following text with a focus on negative aspects:\n\n${text}`);
    } else{
        summary = await sumarizeFeedBack(`Summarize the following text:\n\n${text}`);
    }

    return {sentiment, summary}
}

export default llmAgent;
