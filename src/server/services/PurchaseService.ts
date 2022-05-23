import * as fs from 'fs';

const fullPurchasesPath = 'src/server/data/purchases.json';

export const createPurchase = (purchase: object) => {
    // Get existing data from JSON file
    const existingPurchasesJSON = fs.readFileSync(fullPurchasesPath, "utf8");
    const existingPurchases = JSON.parse(existingPurchasesJSON);
    // Add data from post request
    existingPurchases.push(purchase);
    const updatedFileContent = JSON.stringify(existingPurchases);
    // Update file content 
    fs.writeFile(fullPurchasesPath, updatedFileContent, (error: any) => {
        if (error) throw error;
    });
};
