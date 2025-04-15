import { createTransport } from "nodemailer";

export type SendMailDto = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

export class Mailer {
  private transporter = createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    secure: false,
    auth: {
      user: "f10de0ff40523f",
      pass: "924d0d8048f6e1",
    },
  });

  constructor() {}

  async sendMail(sendMailDto: SendMailDto) {
    const { from, html, subject, to } = sendMailDto;

    console.log(sendMailDto);

    try {
      await this.transporter.sendMail({
        from,
        html,
        subject,
        to,
      });
    } catch (err) {
      console.log(err);
    }

    return true;
  }
}
