import AdminFunctionServices from './AdminFuncServices';
import { Request, Response, NextFunction } from 'express';
import upload from '../../middleware/fileUploadMiddleware';
import * as path from '../../helper/path';
import signUpSchema from '../../middleware/JOIvalidationMiddleware';



class AdminFunctionController {

    async getSignUpPage(res: Response) {
        const filePath: string = path.join(__dirname, "../../HTML", "sign-up.html");
        res.sendFile(filePath);
    }

    async postSignUp(req: Request, res: Response) {
        try {
            upload.single('profile')(req, res, async (err: any) => {
                if (err) {
                    console.log("error in uploading image", "color:#3f7cff", err);
                    return res.status(500).json({ error: "Internal Server Error" });
                }
                const profile = req.file;
                const validation = signUpSchema.validate({
                    ...req.body,
                    profile: req.file,
                });
                const profiledata = req.body;
                if (validation.error) {
                    return res
                        .status(400)
                        .json({ error: validation.error.details[0].message });
                }
                const newUser = await AdminFunctionServices.createNewUser(
                    profiledata,
                    profile!.filename
                );
                res.json({ message: 'User added successfully!!', user: newUser });
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getEditUser_PrefilledDetails(req: Request, res: Response) {
        try {
            const userIdString: string | undefined = req.query.id as string | undefined;
            if (!userIdString) {
                throw new Error('UserID is missing in the Request.');
            }
            const userId: number = parseInt(userIdString);
            const findUser = await AdminFunctionServices.getEditUserDetails(userId);
            const profileName = findUser?.profileName;
            res.status(200).json(findUser);

        } catch (error) {
            console.log('error: ', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async putUpdateUser(req: Request, res: Response) {
        try {
            upload.single('profile')(req, res, async (err: any) => {
                if (err) {
                    console.log("error in uploading image", "color:#3f7cff", err);
                    return res.status(500).json({ error: "Internal Server Error" });
                }
                const userId: any = req.query.id;
                const updatedUserData = req.body;
                const updatedProfile = req.file?.filename ;

                const updateUser = await AdminFunctionServices.updateUserDetails(userId, updatedProfile, updatedUserData);
                res.status(200).json({ message: 'User Details Updated Successfully', updateUser });
            });
        } catch (error) {
            console.log('error: ', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const userId: any = req.query.id;

            const DeleteUser = await AdminFunctionServices.deleteUserFunc(userId);
            res.status(200).json({ message: 'User Deleted Successfully' });
        } catch (error) {
            console.log('error: ', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}


export default new AdminFunctionController();