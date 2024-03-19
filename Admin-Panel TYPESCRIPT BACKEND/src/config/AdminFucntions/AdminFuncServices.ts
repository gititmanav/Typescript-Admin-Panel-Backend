import User from '../../database/userModel';


class AdminFunctionServices {
    
    async createNewUser(
        profiledata: any,
        profileName: string
    ) {
        try {
            const newUser = await User.create({
                firstName: profiledata.firstName,
                lastName: profiledata.lastName,
                email: profiledata.email,
                password: profiledata.password,
                phoneNumber: profiledata.phoneNumber,
                roleId: profiledata.roleId,
                profileName: profileName,
            });
            return newUser;

        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Internal Server Error');
        }
    }

    async getEditUserDetails(userId: any) {
        try {
            const user = await User.findByPk(userId);
            return user;
        } catch (error) {
            console.log('Error Getting user details: ', error);
            throw new Error('Internal Server Error');
        }
    }

    async updateUserDetails(userId: any, updatedProfile: any, updatedUserData: any,) {
        try {
            console.log('userId: ', userId);
          console.log('updatedProfile:::::::::::::::: ', updatedProfile);
        const updateUser = await User.update(
            { ...updatedUserData, profileName: updatedProfile },
            { where: { userId: userId }, returning: true });
            return updateUser;

      } catch (error) {
        console.log('Error Getting user details: ', error);
        throw new Error('Internal Server Error');
      }
       
    }

    async deleteUserFunc(userId: any){
        try {
            const user = await User.findByPk(userId);
        if(!user){
            throw new Error('User does not exist in the Database');
        }
        await user.destroy();
        } catch (error) {
            console.log('Error deleting User: ', error);
            throw new Error('Internal Server Error');
        }
    }
}

export default new AdminFunctionServices();