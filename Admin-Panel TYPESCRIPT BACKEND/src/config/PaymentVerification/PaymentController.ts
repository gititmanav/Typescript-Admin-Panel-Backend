import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import PaymentServices from './PaymentServices';


class PaymentVeriController {

    postCreateOrder(req: Request, res: Response) {
        try {
            const razorpay = new Razorpay({
                key_id: process.env.RAZORPAY_ID_KEY || '',
                key_secret: process.env.RAZORPAY_SECRET_KEY || '',
            });
            var options = {
                amount: req.body.amount,  // amount in the smallest currency unit
                currency: "INR",
                receipt: "rcpt1"
            };
            // Initialize Razorpay with your key and secret from environment variables
            razorpay.orders.create(options, (err: any, order: any) => {
                if (err) {
                    console.error('Error creating order:', err);
                    res.status(500).send({ error: 'Internal server error' });
                    return;
                }
                console.log('Order:',order);
                res.send({ orderId: order.id });
            });
        } catch (error) {
            console.error('Error initializing Razorpay:', error);
            res.status(500).send({ error: 'Internal server error' });
        } 
}

    async postVerifyPayment(req: Request, res: Response) {
        const email = req.body.email;
        let body = req.body.orderId + "|" + req.body.response.razorpay_payment_id;
        
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY || '')
                                        .update(body.toString())
                                        .digest('hex');
                                        console.log('Signature Recieved:', req.body.response.razorpay_signature);
                                        console.log('Generated Signature:', expectedSignature);

            const PromoteUser = await PaymentServices.PromotetoAdmin(email);
            const response = {"signatureIsValid" : "true"};
            res.send(response);   
    }
}

export default new PaymentVeriController();
