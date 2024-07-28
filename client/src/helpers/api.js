import axios from 'axios';

const BASE_URL = "http://localhost:5000/api";

export async function addNewPurchase(purchaseData) {
    try {
        const response = await axios.post(`${BASE_URL}/purchases/purchases`, purchaseData);
        return response.data;
    } catch (error) {
        console.error('Failed to add new purchase:', error);
        throw error;
    }
}

export async function addNewSale(saleData) {
    try {
        const response = await axios.post(`${BASE_URL}/purchases/sales`, saleData);
        return response.data;
    } catch (error) {
        console.error('Failed to add new sale:', error);
        throw error;
    }
}

export async function fetchStockItems() {
    try {
        const response = await axios.get(`${BASE_URL}/purchases/stock-items`);
        if (response.status === 200 && Array.isArray(response.data)) {
            return response.data;
        } else {
            throw new Error('Invalid response from server');
        }
    } catch (error) {
        console.error('Failed to fetch stock items:', error);
        throw error;  // Re-throw para manejar más arriba si es necesario
    }
}

// Nueva función para obtener los datos de ventas por producto
export async function fetchSalesData() {
    try {
        const response = await axios.get(`${BASE_URL}/purchases/sales-data`);
        return response.data;  // Datos de ventas
    } catch (error) {
        console.error('Failed to fetch sales data:', error);
        throw error;
    }
}

// Nueva función para obtener los datos de compras por fecha
export async function fetchPurchaseData() {
    try {
        const response = await axios.get(`${BASE_URL}/purchases/purchase-data`);
        return response.data;  // Datos de compras
    } catch (error) {
        console.error('Failed to fetch purchase data:', error);
        throw error;
    }
}

// Nueva función para obtener datos de ventas por proveedor
export async function fetchVendorData() {
    try {
        const response = await axios.get(`${BASE_URL}/purchases/vendor-data`);
        return response.data;  // Datos de ventas por proveedor
    } catch (error) {
        console.error('Failed to fetch vendor data:', error);
        throw error;
    }
}

export async function updateStockItem(id, data) {
    try {
        const response = await axios.patch(`${BASE_URL}/purchases/stock-items/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Failed to update stock item with ID ${id}:`, error);
        throw error;
    }
}

export async function deleteStockItem(id) {
    try {
        const response = await axios.delete(`${BASE_URL}/purchases/stock-items/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to delete stock item with ID ${id}:`, error);
        throw error;
    }
}



