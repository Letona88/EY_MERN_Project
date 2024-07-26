import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewPurchase } from "../helpers/api.js"

export function NewPurchase() {
    const navigate = useNavigate();
    const [purchase, setPurchase] = useState({
        productId: 0,
        product: "",
        quantity: 0,
        vendor: "",
        unitCost: 0,
        totalAmount: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPurchase(prev => {
            let updatedValue = value;

            if (name === "quantity" || name === "unitCost") {
                updatedValue = parseFloat(value);
                updatedValue = isNaN(updatedValue) || updatedValue < 0 ? 0 : updatedValue;
            } else if (name === "productId") {
                updatedValue = Math.floor(parseFloat(value));
                updatedValue = isNaN(updatedValue) || updatedValue < 0 ? 0 : updatedValue;
            }

            const updatedPurchase = {
                ...prev,
                [name]: updatedValue,
            };

            // Recalcular total solo si es necesario
            if (name === "quantity" || name === "unitCost") {
                updatedPurchase.totalAmount = calculateTotal(updatedPurchase.quantity, updatedPurchase.unitCost);
            }

            return updatedPurchase;
        });
    };


    const calculateTotal = (quantity, unitCost) => {
        return quantity * unitCost; // Esta operación siempre devolverá un número
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await addNewPurchase(purchase);
            console.log('Purchase added successfully:', data);
            navigate('/dashboardhome');
        } catch (error) {
            console.error('Failed to submit purchase:', error);
        }
    };

    return (
        <div className="flex flex-col items-center h-screen w-full bg-gray-300 p-6 justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                <h1 className="text-3xl font-semibold mb-6 text-center">Ingreso Nueva Compra</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label className="block text-gray-700">ID</label>
                        <input type="number" name="productId" value={purchase.productId} onChange={handleChange}
                               min="0" step="1" className="w-full mt-1 p-2 border border-gray-300 rounded-md" required/>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Producto</label>
                        <input type="text" name="product" value={purchase.product} onChange={handleChange}
                               className="w-full mt-1 p-2 border border-gray-300 rounded-md" required/>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Proveedor</label>
                        <input type="text" name="vendor" value={purchase.vendor} onChange={handleChange}
                               className="w-full mt-1 p-2 border border-gray-300 rounded-md" required/>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Cantidad</label>
                        <input type="number" name="quantity" value={purchase.quantity} onChange={handleChange}
                               min="0" step="1" className="w-full mt-1 p-2 border border-gray-300 rounded-md" required/>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Costo Unitario</label>
                        <input type="number" name="unitCost" value={purchase.unitCost} onChange={handleChange}
                               min="0" step="0.01" className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                               required/>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Total</label>
                        <input type="text" name="totalAmount" value={`Q ${parseFloat(purchase.totalAmount).toFixed(2)}`}
                               className="w-full mt-1 p-2 border border-gray-300 rounded-md" readOnly/>
                    </div>

                    <button type="submit"
                            className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit Purchase
                    </button>
                </form>
            </div>
        </div>
    );
}
