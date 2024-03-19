import { where } from "sequelize";
import User from "../../database/userModel";
import { Request, Response, NextFunction } from 'express';

class OTPandResetServices {

    async saveOTP(otp: number, email: any) {
        try {
            const savingotp = User.update(
                { otp: otp },
                {
                    where: { email: email }
                });
            return savingotp;
        } catch (error) {
            console.log('error: ', error);
            throw new Error('Internal server Error');
        }
    }

    async verifyOTPservices(otp: number) {
        try {
            const findUser = await User.findOne({
                where: { otp: otp }
            });
            if (findUser) {
                // Delete the OTP
                await findUser.update({ otp: null });
                return findUser;

            } else {
                throw new Error('Invalid OTP');
            }
        } catch (error) {
            console.log('error: ', error);
            throw new Error('Internal server Error');
        }
    }

    async ResetPasswordServices(newPassword: any, email: any) {
        try {
            const findUser = await User.update(
                { password: newPassword },
                {
                    where: { email: email }
                })
                return findUser;

        } catch (error) {
            console.log('error: ', error);
            throw new Error('Internal server Error');
        }
    }
}

export default new OTPandResetServices();
