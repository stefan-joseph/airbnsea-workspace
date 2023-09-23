const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
sgMail.setApiKey;

export const sendEmail = async (
  recipient: string,
  url: string,
  linkText: string
) => {
  const msg = {
    to: `${recipient}`,
    from: "stefanjoseph.dev@gmail.com",
    subject: "Confirm Airbnsea account",
    // text: "and easy to do anywhere, even with Node.js",
    html: `<a href=${url}>${linkText}</a>`,
  };

  await sgMail.send(msg);
};
