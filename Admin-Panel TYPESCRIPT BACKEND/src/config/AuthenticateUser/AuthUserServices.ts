import User from "../../database/userModel";
import Role from "../../database/roleModel";


class AuthenticateUserServices {

    async loginValidation(email: any, password: any) {
        try {
            console.log('email: ', email);
            console.log('password: ', password);
            const user = await User.findOne({
                where: { email: email, password: password },
                include: Role,
            });
            if (user) {
                const roleName = user.role ? user.role.roleName : null;
                console.log('roleName: ', roleName);
                return { user, roleName };
            } else {
                throw new Error('Invalid Email or Password');
            }
        } catch (error) {
            console.log('error: ', error);
            throw new Error('Internal Server Error');
        }
    }

}

export default new AuthenticateUserServices();