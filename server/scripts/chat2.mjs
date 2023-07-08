// import { Configuration, OpenAIApi } from 'openai';
// import 'dotenv/config'

// const configuration = new Configuration({
//     apiKey: "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",
// });

// const openai = new OpenAIApi(configuration);

// try {
//     const response = await openai.createChatCompletion({
//         model: 'gpt-3.5-turbo',
//         messages: [
//             {
//                 role: 'system',
//                 content: 'You are a helpful AI assistant.'
//             },
//             {
//                 role: 'user',
//                 content: 'How many states does Mexico have?'
//             }
//         ]
//     });

//     console.log(response.data.choices[0].message.content);
// } catch (error) {
//     if (error.response) {
//         console.log(error.response.status);
//         console.log(error.response.data);
//     } else {
//         console.log(error.message);
//     }
// }