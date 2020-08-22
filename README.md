# An apps script mail merger application

This apps script code:
- Reads a specific Gmail draft based on the subject line.
- Reads first names and corresponding email addresses from a google sheet.
- Sends the draft email text to all email addresses listed in the google sheet using the first names in the google sheets column.
- When the email is sent to a specific email address a timestamp will be placed in the corresponding row in the google sheet. 
- The code makes sure emails will not be sent multiple times to the same address: When the code reruns, it'll only send the email to addresses that do not have a timestamp.

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
