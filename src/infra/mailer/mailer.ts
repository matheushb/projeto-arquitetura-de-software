import { createTransport } from "nodemailer";
import envConfigService, {
  EnvConfigKeys,
} from "../environment-config/env-config.service";
import { LogManager } from "../logger/log-manager";

export type SendMailDto = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

export class Mailer {
  private transporter = createTransport({
    host: envConfigService.get(EnvConfigKeys.EMAIL_HOST),
    port: Number(envConfigService.get(EnvConfigKeys.EMAIL_PORT)),
    secure: false,
    auth: {
      user: envConfigService.get(EnvConfigKeys.EMAIL_USER),
      pass: envConfigService.get(EnvConfigKeys.EMAIL_PASS),
    },
  });
  private logMananager = LogManager.getInstance();

  constructor() {}

  async sendMail(sendMailDto: SendMailDto) {
    const { from, html, subject, to } = sendMailDto;

    this.logMananager.addLog(`sending email to ${to}`);

    await this.transporter.sendMail({
      from,
      html,
      subject,
      to,
    });

    this.logMananager.addLog(`email sent to ${to}`);
  }
}
