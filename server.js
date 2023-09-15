
import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { AbortController } from 'abort-controller'

dotenv.config();
const API_Key = process.env.OPENAI_API_KEY
const VITE_GOOGLE_CALENDAR_CLIENT_ID = process.env.VITE_GOOGLE_CALENDAR_CLIENT_ID
const VITE_GOOGLE_CALENDAR_CLIENT_SECRET = process.env.VITE_GOOGLE_CALENDAR_CLIENT_SECRET
const VITE_GOOGLE_CALENDAR_REDIRECT_URL = process.env.VITE_GOOGLE_CALENDAR_REDIRECT_URL
const VITE_GOOGLE_CALENDAR_API_KEY = process.env.VITE_GOOGLE_CALENDAR_API_KEY

const PORT = 5000;
const app = express();

app.use(express.json());
//app.use(cors());

const corsOptions = {
    origin: 'https://journeypath-17d60.web.app', // Replace with your frontend URL
  };
  
  app.use(cors(corsOptions));

// ****************** OPENAI CHATGPT SERVER INFO ****************** //

const openai = new OpenAI({
    apiKey: API_Key,
  });
  
  let moderation;

  app.post('/completions', async (req, res) => {
    const userMessage = req.body.message;
    const options = {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${API_Key}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }],
                temperature: 0.2,
              })
            }
      try {
        moderation = await openai.moderations.create({
          input: userMessage,
        });
        // console.log('these are the moderation results', moderation.results[0]);
        console.log('this is moderation.flagged', moderation.results[0].flagged)

        if (!moderation.results[0].flagged) {
          const response = await fetch("https://api.openai.com/v1/chat/completions", options)
          const data = await response.json()
          console.log("this is the response back", data)
          res.send(data)
        } else {
          res.status(400).json({ error: 'Prompt Does Not Comply With Terms of Use' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
      }
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ****************** GOOGLE CALENDAR SERVER INFO ****************** //
// const oauth2Client = new google.auth.OAuth2(
//     VITE_GOOGLE_CALENDAR_CLIENT_ID,
//     VITE_GOOGLE_CALENDAR_CLIENT_SECRET,
//     VITE_GOOGLE_CALENDAR_REDIRECT_URL
// );

// const scopes = [
//     'https://www.googleapis.com/auth/calendar'
// ];

// const calendar = google.calendar({
//     version: 'v3', 
//     auth: VITE_GOOGLE_CALENDAR_API_KEY
// });

// let token=""

// app.get('/calendar/authenticate', (req, res) => {
//     const url = oauth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: scopes,
//         redirect_uri: 'http://localhost:5173/calendar/redirect', // Update the redirect URL
//     });
//     console.log('Sending Google OAuth2 URL to the front end:', url);
//     res.json({ authUrl: url });
// });

// app.get('/calendar/redirect', async (req, res) => {
//     const code = req.query.code;

//     try {
//         const { tokens } = await oauth2Client.getToken(code);
//         oauth2Client.setCredentials(tokens);
//         token = tokens.access_token;
//         res.send({
//             message: 'Successfully logged in',
//         });
//     } catch (error) {
//         console.error('Error exchanging Google OAuth2 code for tokens:', error);
//         res.status(500).send('Error logging in with Google');
//     }
// });

// app.get('/calendar/fetch_calendar_events', async (req, res) => {
//     try {
//         console.log("in the fetch calendar events")
//         console.log('this is calendar', calendar.events)
//         console.log('this is oauth2Client', oauth2Client)
//       const response = await calendar.events.list({
//         calendarId: 'primary', 
//         auth: oauth2Client,
//       });
//       console.log(response)
//       const events = response.data.items;
//       res.json(events);
//     } catch (error) {
//       console.error('Error fetching calendar events:', error);
//     }
//   });

// ****************** REF ONLY **** GOOGLE CALENDAR SERVER INFO ****************** //


// app.get('/calendar/authenticate', (req, res) => {
//     const url = oauth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: scopes,
//         redirect_uri: 'http://localhost:5173/calendar/redirect', // Update the redirect URL
//     });
//     console.log('Sending Google OAuth2 URL to the front end:', url);
//     res.json({ authUrl: url });
// });

// app.get('/calendar', (req, res) => {
//     console.log('in the calendar')
//     const url = oauth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: scopes
//     });
//     console.log('this is the auth url', url)
//     res.redirect(url);
// });

// app.get('/calendar/redirect', async (req, res) => {
//     console.log('Received callback from Google'); // Add this line
//     const code = req.query.code;

//     try {
//         console.log('in the redirect')
//         const { tokens } = await oauth2Client.getToken(code);
//         console.log('Successfully obtained tokens:', tokens); // Add this line
//         console.log('User ID:', tokens.id_token.claims.sub); // Add this line
//         console.log('Email:', tokens.id_token.claims.email); // Add this line

//         res.send({
//             message: 'Successfully authenticated with Google',
//         });
//     } catch (error) {
//         console.error('Error exchanging Google OAuth2 code for tokens:', error);
//         res.status(500).send('Error logging in with Google');
//     }
// });

// app.get('/calendar/fetch_calendar_events', async (req, res) => {
//     try {
//         console.log('Received request to fetch calendar events'); // Add this line
//         const response = await calendar.events.list({
//             calendarId: 'primary',
//             auth: oauth2Client,
//         });
//         console.log('Response from Google Calendar API:', response); // Add this line
//         const events = response.data.items;
//         res.json(events);
//     } catch (error) {
//         console.error('Error fetching calendar events:', error); // Add this line
//         res.status(500).send('Error fetching calendar events');
//     }
// });

//   app.get('/calendar/schedule_event', async (req, res) => {

//     await calendar.events.insert({
//         calendarId: 'primary',
//         auth: oauth2Client,
//         requestBody: {
//             summary: 'Test Event',
//             description: 'This is a test event',
//             start: {
//                 dateTime: '2023-09-02T09:00:00-07:00',
//                 timeZone: 'America/New_York'
//             },
//             end: {
//                 dateTime: '2023-09-02T10:00:00-07:00',
//                 timeZone: 'America/New_York'
//             }
//         }
//     }).then((response) => {
//         console.log(response);
//         res.send('Event scheduled');
//     }
//     ).catch((err) => {
//         console.log(err);
//         res.send('Error in scheduling event');
//     }
//     );
// });




