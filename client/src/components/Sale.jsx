import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addNewSale, fetchStockItems } from "../helpers/api.js"

export function NewSale() {
    const navigate = useNavigate();
    const [sale, setSale] = useState({
        productId: '',
        product: '',
        vendor: '',
        quantity: 0,
        unitCost: 0,
        totalAmount: 0
    });
    const [stockItems, setStockItems] = useState([]);

    useEffect(() => {
        async function loadStockData() {
            try {
                const items = await fetchStockItems();
                setStockItems(items); // Simplemente establece los artículos de stock
            } catch (error) {
                console.error("Error loading stock items:", error);
            }
        }
        loadStockData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSale(prev => {
            let updatedValue = value;

            if (name === "quantity" || name === "unitCost") {
                updatedValue = parseFloat(value);
                updatedValue = isNaN(updatedValue) || updatedValue < 0 ? 0 : updatedValue;
            } else if (name === "productId") {
                const selectedItem = stockItems.find(item => item.productId.toString() === value);
                if (selectedItem) {
                    return {
                        ...prev,
                        productId: selectedItem.productId,
                        product: selectedItem.product,
                        vendor: selectedItem.vendor,
                        unitCost: selectedItem.unitCost,
                        quantity: 0, // Reset quantity on product change
                        totalAmount: 0
                    };
                }
            }

            const updatedSale = {
                ...prev,
                [name]: updatedValue,
            };

            // Recalcular total solo si es necesario
            if (name === "quantity" || name === "unitCost") {
                updatedSale.totalAmount = calculateTotal(updatedSale.quantity, updatedSale.unitCost);
            }

            return updatedSale;
        });
    };

    const calculateTotal = (quantity, unitCost) => {
        return quantity * unitCost;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await addNewSale(sale);
            console.log('Sale added successfully:', data);
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to submit sale:', error);
        }
    };

    return (
        <div className="flex flex-col items-center h-screen w-full bg-gray-300 p-6 justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                <h1 className="text-3xl font-semibold mb-6 text-center">Registrar Nueva Venta</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">ID del Producto</label>
                        <select name="productId" value={sale.productId} onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md" required>
                            {stockItems.map(item => (
                                <option key={item.productId} value={item.productId}>
                                    {item.productId} - {item.product}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Producto</label>
                        <input type="text" name="product" value={sale.product}
                               className="w-full mt-1 p-2 border border-gray-300 rounded-md" readOnly/>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Proveedor</label>
                        <input type="text" name="vendor" value={sale.vendor}
                               className="w-full mt-1 p-2 border border-gray-300 rounded-md" readOnly />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Cantidad</label>
                        <input type="number" name="quantity" value={sale.quantity} onChange={handleChange}
                               min="0" step="1" className="w-full mt-1 p-2 border border-gray-300 rounded-md" required />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Costo Unitario</label>
                        <input type="number" name="unitCost" value={sale.unitCost} onChange={handleChange}
                               min="0" step="0.01" className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                               required />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Total</label>
                        <input type="text" name="totalAmount" value={`Q ${parseFloat(sale.totalAmount).toFixed(2)}`}
                               className="w-full mt-1 p-2 border border-gray-300 rounded-md" readOnly />
                    </div>

                    <button type="submit"
                            className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Registrar Venta
                    </button>
                </form>
            </div>
        </div>
    );
}
