# An apps script mail merger application

This apps script code:
- Reads a draft email text from Gmail.
- Reads first names and corresponding email addresses from a google sheet.
- sends the draft email text to all email addresses listed in the google sheet.
- timestamps the sending of the email per row in the google sheet. 
- only sends emails to email addresses without send timestamp.

## draft email template

    Hello <<FirstName>>,
    <br/>
    <br/>
    EMAIL TEXT
    <br/>
    <br/>
    Kind regards,
    <br/>
    <br/>
    Name sender
