import User from "../../database/userModel";

class PaymentServices {

    async  PromotetoAdmin(email: any){
        try {
            const updatedUser = await User.update({ roleId: '1' }, { where: { email: email } });
            console.log(`User with email ${email} promoted to admin successfully.`);
            return updatedUser;
        } catch (error) {
            console.error(`Error promoting user to admin: ${error}`);
        }
    }
    
}

export default new PaymentServices();
