import RNFS from "react-native-fs";
import Share from "react-native-share";
import { PDFDocument, Page, Text, rgb } from "react-native-pdf-lib";
import { PermissionsAndroid, Platform, Alert } from "react-native";

export const requestStoragePermission = async () => {
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Storage Permission",
        message: "App needs storage permission to download PDF.",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

export const generateInvoicePdf = async (invoiceData, invoiceNumber) => {
  try {
    const permission = await requestStoragePermission();
    if (!permission) {
      Alert.alert("Permission Denied", "Cannot save PDF without permission.");
      return null;
    }

    // Path to save the PDF
    const pdfPath = `${RNFS.DownloadDirectoryPath}/${invoiceNumber}.pdf`;

    // Create PDF content
    const pdfDoc = PDFDocument.create(pdfPath);
    const page1 = Page.create()
      .setMediaBox(600, 800)
      .drawText(`PATIRAM PRODUCTION`, {
        x: 60,
        y: 760,
        color: rgb(0.2, 0.4, 0.8),
        fontSize: 18,
      })
      .drawText(`Invoice #: ${invoiceNumber}`, { x: 60, y: 730, fontSize: 12 })
      .drawText(`Date: ${new Date().toLocaleDateString()}`, { x: 60, y: 710, fontSize: 12 })
      .drawText(`Customer: ${invoiceData.customer_name}`, { x: 60, y: 690, fontSize: 12 })
      .drawText(`Company: ${invoiceData.company || "-"}`, { x: 60, y: 670, fontSize: 12 })
      .drawText(`Payment Status: ${invoiceData.payment_status}`, { x: 60, y: 650, fontSize: 12 });

    let y = 620;
    page1.drawText("Products:", { x: 60, y, fontSize: 14, color: rgb(0, 0, 0) });
    y -= 20;

    if (Array.isArray(invoiceData.products) && invoiceData.products.length > 0) {
      invoiceData.products.forEach((prod, index) => {
        page1.drawText(
          `${index + 1}. ${prod.product_name} | Qty: ${prod.quantity} | ₹${prod.total_amount}`,
          { x: 60, y, fontSize: 11 }
        );
        y -= 15;
      });
    } else {
      page1.drawText("No products found", { x: 60, y, fontSize: 12 });
      y -= 15;
    }

    y -= 20;
    page1.drawText(`Grand Total: ₹${invoiceData.grand_total}`, { x: 60, y, fontSize: 13 });
    y -= 15;
    page1.drawText(`Due Amount: ₹${invoiceData.due_amount}`, { x: 60, y, fontSize: 13 });

    pdfDoc.addPages(page1);

    const pdfUri = await pdfDoc.write(); // Write the PDF
    return pdfPath;
  } catch (error) {
    console.error("Error generating PDF:", error);
    Alert.alert("Error", "Failed to generate PDF");
    return null;
  }
};

export const sharePdf = async (pdfPath) => {
  try {
    await Share.open({
      title: "Share Invoice",
      url: `file://${pdfPath}`,
      type: "application/pdf",
      failOnCancel: false,
    });
  } catch (error) {
    console.error("Error sharing PDF:", error);
  }
};
