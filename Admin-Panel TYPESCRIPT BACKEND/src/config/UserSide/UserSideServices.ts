import User from "../../database/userModel";


class UserSideServices {

    async getAllUserServices() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw new Error("Internal Server Error"); 
        }
    }

    async getAdminServices() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw new Error("Internal Server Error"); 
        }
    }
}

export default new UserSideServices();