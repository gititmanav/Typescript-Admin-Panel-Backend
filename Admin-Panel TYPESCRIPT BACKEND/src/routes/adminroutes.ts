import { Router } from "express";
import AdminFuncController from "../config/AdminFucntions/AdminFuncController";
import AuthUserController from "../config/AuthenticateUser/AuthUserController";
import PDFcontroller from "../config/DownloadPDF/PDFcontroller";
import OTPcontroller from "../config/OTP&ResetPassword/OTPcontroller";
import UserSideController from "../config/UserSide/UserSideController";
import PaymentVeriController from "../config/PaymentVerification/PaymentController";
const router = Router();

// Login router 
router.post('/login', AuthUserController.postLogin);

// Routes for Admin Functions like edit, update, delete.
router.get('/sign-up', AdminFuncController.getSignUpPage);
router.post('/sign-up', AdminFuncController.postSignUp);
router.get('/edit-user', AdminFuncController.getEditUser_PrefilledDetails);
router.put('/update-user', AdminFuncController.putUpdateUser);
router.delete('/delete-user', AdminFuncController.deleteUser);

// Download PDF routes 
router.get('/downloadPDF', PDFcontroller.generatePdf);

// OTP and Password Reset Routes 
router.post('/forgot-password', OTPcontroller.sendingOTP);
router.post('/verify-otp', OTPcontroller.verifyOTPController);
router.put('/reset-password', OTPcontroller.ResetPasswordController);

// Userside displaying of data
router.get('/all-users', UserSideController.getAllUserController);
router.get('/admin', UserSideController.getAdminController);

// Payment verification 
router.post('/create-orderId', PaymentVeriController.postCreateOrder);      
router.post('/verify-payment', PaymentVeriController.postVerifyPayment);
export default router;