const nodemailer = require("nodemailer");
require("dotenv").config();
const Mustache = require("mustache");
const fs = require("fs");
const path = require("path");
const { error } = require("console");
const user = require("../models/user");

class EmailService {
  //welcome user email
  async welcomeUserEmail(user) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      await transporter.verify();

      //load mustache templte
      const templatePath = path.join(
        __dirname,
        "../templates/welcomeUser.html",
      );
      const template = fs.readFileSync(templatePath, "utf-8");

      //read templted

      const html = Mustache.render(template, {
        fullName: user.fullName,
        email: user.email,
        roles: user.roles,
        status: user.status,
        loginUrl: process.env.LOGIN_URL,
        year: new Date().getFullYear(),
      });

      //send email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Welcome to Our Platform",
        html: html,
      });

      console.log("welcome email send succesfully");
    } catch (error) {
      console.log("Email Erro:", error.message);
    }
  }

  //retun value to send user
  getSafeUser(user) {
    return {
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.middleName} ${user.lastName}`,
      email: user.email,
      city: user.city,
      state: user.state,
      status: user.status,
    };
  }
  async sendBlockEmail(user) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.verify();

      //load mustache template
      const templatePath = path.join(
        __dirname,
        "../templates/accountBlocked.html",
      );
      const template = fs.readFileSync(templatePath, "utf-8");

      //call funtion to mustache
      const SafeUser = this.getSafeUser(user);

      //read templted
      const html = Mustache.render(template, SafeUser);

      //send eamil
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Account Blocked",
        html: html,
      });

      console.log("block email send successfully");
    } catch (error) {
      console.log("Email Error:", error.message);
    }
  }

  //otp send email
  async sendOtpEmail(user, otp) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.verify();

      //load template
      const templatePath = path.join(__dirname, "../templates/otp.html");

      const template = fs.readFileSync(templatePath, "utf-8");

      //data for template
      const data = {
        name: user.firstName,
        otp: otp,
        expiry: process.env.OTP_EXPIRE_MINUTES,
      };

      const html = Mustache.render(template, data);

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Your OTP code",
        html: html,
      });

      console.log("OTP email sent succesfuly");
    } catch (error) {
      console.log("otp email error:", error);
    }
  }
}

module.exports = new EmailService();
