import jsPDF from "jspdf";

const generatePDF = (data) => {
  const doc = new jsPDF();

  const lineHeight = 10; // Adjust as needed

  data.forEach((row, index) => {
    if (index !== 0) {
      doc.addPage();
    }

    Object.entries(row).forEach(([key, value], i) => {
      const yPos = 20 + i * lineHeight;
      doc.text(`${key}: ${value}`, 10, yPos);
    });

    if (index !== data.length - 1) {
      doc.addPage();
    }
  });

  // Save the PDF
  doc.save("mypdf.pdf");
};

export default generatePDF;
