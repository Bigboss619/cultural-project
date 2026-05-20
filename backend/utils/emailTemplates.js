function replyEmailTemplate(data) {
  const { userName, originalSubject, originalMessage, adminReply, senderName } = data;

  return {
    subject: `Re: ${originalSubject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #B85C3C; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0;">${senderName || 'Cultural Project'}</h2>
          <p style="margin: 5px 0 0; opacity: 0.9; font-size: 14px;">Reply to your message</p>
        </div>

        <div style="background-color: #fff; padding: 20px; border: 1px solid #e0d5c7;">
          <p style="margin: 0 0 15px;">Hi ${userName},</p>

          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0 0 10px; font-weight: bold; color: #666; font-size: 14px;">Your Original Message:</p>
            <p style="margin: 0; color: #444;">${originalMessage}</p>
          </div>

          <div style="background-color: #e8f4fc; padding: 15px; border-radius: 8px; border-left: 4px solid #B85C3C;">
            <p style="margin: 0 0 10px; font-weight: bold; color: #333;">Our Response:</p>
            <p style="margin: 0; color: #555; white-space: pre-wrap;">${adminReply}</p>
          </div>

          <p style="margin-top: 20px; color: #888; font-size: 14px;">
            Thank you for contacting us. We typically respond within 24-48 hours.
          </p>
        </div>

        <div style="background-color: #f0ebe3; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #666;">
          <p style="margin: 0;">This email was sent from your inquiry on our website.</p>
          <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} ${senderName || 'Cultural Project'}</p>
        </div>
      </div>
    `,
    text: `Hi ${userName},

YOUR MESSAGE:
${originalMessage}

OUR RESPONSE:
${adminReply}

---
Thank you for contacting us. We typically respond within 24-48 hours.
This email was sent from your inquiry on our website.`,
  };
}

function contactNotificationTemplate(data) {
  const { visitorName, visitorEmail, subject, message } = data;

  return {
    subject: `New Contact: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #B85C3C; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0;">New Contact Form Submission</h2>
        </div>

        <div style="background-color: #fff; padding: 20px; border: 1px solid #e0d5c7;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; width: 100px;">Name:</td>
              <td style="padding: 10px 0;">${visitorName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold;">Email:</td>
              <td style="padding: 10px 0;"><a href="mailto:${visitorEmail}">${visitorEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold;">Subject:</td>
              <td style="padding: 10px 0;">${subject}</td>
            </tr>
          </table>

          <div style="margin-top: 20px;">
            <p style="font-weight: bold; margin-bottom: 10px;">Message:</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px;">
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        </div>
      </div>
    `,
    text: `NEW CONTACT FORM SUBMISSION

Name: ${visitorName}
Email: ${visitorEmail}
Subject: ${subject}

Message:
${message}`,
  };
}

module.exports = { replyEmailTemplate, contactNotificationTemplate };