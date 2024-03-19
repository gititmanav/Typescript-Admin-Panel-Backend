import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Request, Response, NextFunction } from 'express';
import DownloadPDfServices from './PDFservices';

class DownloadPDfController {

    async generatePdf(req: Request, res: Response) {
        try {
            const allUsers = await DownloadPDfServices.getDataforPDF();
            
            // Create a new PDF document
            const doc = new jsPDF();

            // Set content type and attachment header to indicate a file download
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", 'attachment; filename="userList.pdf"');

            // Define table headers
            const headers: string[] = ["First Name", "Last Name", "Email", "Phone Number"];

            // Convert user data to a 2D array
            const data: (string | number)[][] = allUsers.map((user) => [
                user.firstName,
                user.lastName,
                user.email,
                user.phoneNumber,
            ]);

            // Add table with headers and data using autoTable plugin
            autoTable(doc, {
                head: [headers],
                body: data,
                theme: "grid", 
                startY: 10, 
            });
            // Save the PDF
            const pdfData = doc.output();
            res.send(pdfData);
            
        } catch (error: any) {
            console.error("Error generating PDF:", error.message);
            res.status(500).send("Error generating PDF");
        }
    }
}

export default new DownloadPDfController();