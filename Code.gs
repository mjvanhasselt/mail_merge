/** @OnlyCurrentDoc */

// Returns my draft email text. 
// This email with subject should saved in the drafts folder of Gmail.

function getDraftBody(draftName) {

  var drafts = GmailApp.getDraftMessages();
  
  for (var i in drafts)
    if(drafts[i].getSubject() == draftName)
      return drafts[i].getPlainBody();
}

// This function sends the email to recipients defined in two columns of an google sheets.
// The function only sends emails to recipients when the send timestamp does not exist yet.
function sendEmails() {
  
  // email list sheet column numbers, 0 based
  const FIRST_NAME_COL = 0;
  const EMAIL_1_COL = 1;
  const EMAIL_2_COL = 2;
  const SUB_COL = 3;
  const DATE_COL = 4;
  
  var maxEmails = 50;
  var draftName = "video voor Carlijn & Pieter!"; // Draft's subject name
  
  var draftBody = getDraftBody(draftName);
  var quotaLeft = MailApp.getRemainingDailyQuota();
  
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName("addresses");
  
  // Gets all sheet data as a 2-dim array.
  var data = sheet.getDataRange().getValues();
  var header = data.shift();
  
  for (var i = 0, count = 0; count < maxEmails && count < quotaLeft && i < data.length; i++) {
    
    var firstName = data[i][FIRST_NAME_COL];
    var recipient1 = data[i][EMAIL_1_COL];
    var recipient2 = data[i][EMAIL_2_COL];
    var subject = data[i][SUB_COL];
    var timestamp = data[i][DATE_COL];
    
    var recipients = [recipient1, recipient2];
    
    var htmlBody = draftBody.replace("<<FirstName>>", firstName);
    
    if(recipients && !timestamp) {
      GmailApp.sendEmail(
        recipients,
        subject,
        "",
        {
          name:"Marc van Hasselt",
          htmlBody:htmlBody
        }
      );
      
      data[i][DATE_COL] = Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd'T'HH:mm:ss'Z'");
      
      ++count;
    }
  };
  
  //Inserts header at top of Array.
  data.unshift(header);
  
  // stores values of array insheet.
  sheet.getRange(1,1, data.length, header.length).setValues(data);
}