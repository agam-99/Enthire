const fs = require("fs");
const { google } = require("googleapis");
const TOKEN_PATH = "token.json";

module.exports.postData = (req, res) => {
  let email = req.body.data;
  let attendees = [];
  for (let i = 0; i < email.length; i++) {
    attendees.push({ email: email[i] });
  }
  console.log(attendees[0]);

  // Load client secrets from a local file.
  fs.readFile("credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Calendar API.
    authorize(JSON.parse(content), listEvents);
  });

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  let oAuth2Client;
  function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }
  function listEvents(auth) {
    const calendar = google.calendar({ version: "v3", auth });
    var event = {
      summary: "Google Hangout Meeting",
      location: "Google Hangout",
      description: "A chance to hear more about Google's developer products. https://hangouts.google.com",
      start: {
        dateTime: "2019-11-28T09:00:00-00:00"
      },
      end: {
        dateTime: "2019-11-28T11:00:00-00:00"
      },
      hangoutLink: "https://hangouts.google.com",
      attendees: attendees,
      reminders: {
        useDefault: true
      }
    };
    calendar.events.insert(
      {
        auth: auth,
        calendarId: "primary",
        resource: event,
        sendNotifications:true
      },
      function(err, event) {
        if (err) {
          console.log(
            "There was an error contacting the Calendar service: " + err
          );
          res.json({ status: "fail" });
          return;
        }
        console.log("Event created: %s", event.data.htmlLink);
        res.json({ status: "success" });
      }
    );
  }
};
