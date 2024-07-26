import axios from 'axios';

// Asegúrate de que esta URL es correcta y corresponde a tu configuración del servidor
const BASE_URL = "http://localhost:5000/api/purchases";

export async function addNewPurchase(purchaseData) {
    try {
        const response = await axios.post(`${BASE_URL}/purchases`, purchaseData);
        return response.data;
    } catch (error) {
        console.error('Failed to add new purchase:', error);
        throw error;
    }
}

export async function addNewSale(saleData) {
    try {
        const response = await axios.post(`${BASE_URL}/sales`, saleData);
        return response.data;
    } catch (error) {
        console.error('Failed to add new sale:', error);
        throw error;
    }
}

export async function fetchStockItems() {
    try {
        const response = await axios.get(`${BASE_URL}/stock-items`);
        return response.data;  // Suponiendo que la API retorna un array de items de stock
    } catch (error) {
        console.error('Failed to fetch stock items:', error);
        throw error;
    }
}
