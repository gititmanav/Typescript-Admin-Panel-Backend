import User from "../../database/userModel";

class DownloadPDfServices {
    
    async getDataforPDF() {
        try {
            const users = await User.findAll();
            return users;

        } catch (error) {
            console.log('error: ', error);
            throw new Error('Internal Server Error');
        }
    }
}

export default new DownloadPDfServices();