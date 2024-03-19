const { generate } = require("generate-otp");
import nodemailer from 'nodemailer';
import { Request, Response, NextFunction } from 'express';
import User from "../../database/userModel";
import OTPandResetServices from './OTPservices';

class OTPandResetController {

    async sendingOTP(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const findUser = await User.findOne({
                where: { email: email },
            });
            if (findUser) {
                const otp = generate(6, {
                    digits: true,
                    alphabets: false,
                    upperCase: false,
                    specialChars: false,
                });
                const saveotp = await OTPandResetServices.saveOTP(otp, email);

                const mailOptions = {
                    from: "manavkaneria@gmail.com",
                    to: email,
                    subject: "Password Reset OTP",
                    text: `Your OTP for resetting the password is ${otp}`,
                };
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "manavkaneria@gmail.com",
                        pass: "gsch omqq qaye ukuk",
                    },
                });
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error("Error sending OTP", error);
                        res.status(500).json({ message: "Error sending OTP" });
                    } else {
                        res.json({ message: "OTP sent Successfully!" });
                    }
                });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error("Error sending the OTP", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async verifyOTPController(req: Request, res: Response) {
        try {
            const { otp } = req.body;
            const verifyOTP = await OTPandResetServices.verifyOTPservices(otp);

            res.status(200).json({ message: "OK" });
        } catch (error) {
            console.error("OTP verification failed.", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async ResetPasswordController(req: Request, res: Response) {
        try {
            const { newPassword, email } = req.body;
            const ResetPassword = await OTPandResetServices.ResetPasswordServices(newPassword, email);
            
            res.status(200).json({ message: 'Password Reset Successfully!' })
        } catch (error) {
            console.error("Couldn't reset password. Please try again", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export default new OTPandResetController();