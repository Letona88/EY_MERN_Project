import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { fetchStockItems, fetchSalesData, fetchPurchaseData, fetchVendorData } from '../helpers/api';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

function Dashboard() {
    const [chartsData, setChartsData] = useState({
        stockData: null,
        salesData: null,
        purchaseData: null,
        vendorData: null
    });

    useEffect(() => {
        async function loadChartData() {
            const responses = await Promise.allSettled([
                fetchStockItems(),
                fetchSalesData(),
                fetchPurchaseData(),
                fetchVendorData()
            ]);

            const data = responses.map(response => response.status === 'fulfilled' ? response.value : []);
            console.log("Sales Data:", data[1]);
            setChartsData({
                stockData: {
                    labels: data[0].map(item => item.product),
                    datasets: [{
                        label: 'Stock Actual',
                        data: data[0].map(item => item.quantity),
                        backgroundColor: 'rgba(53, 162, 235, 0.5)'
                    }]
                },
                salesData: {
                    labels: data[1].map(sale => sale._id),
                    datasets: [{
                        label: 'Ventas por Producto',
                        data: data[1].map(sale => sale.totalSales),
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                    }]
                },
                purchaseData: {
                    labels: data[2].map(purchase => purchase._id),
                    datasets: [{
                        label: 'Compras por Fecha',
                        data: data[2].map(purchase => purchase.totalPurchases),
                        borderColor: '#42A5F5',
                        fill: false
                    }]
                },
                vendorData: {
                    labels: data[3].map(vendor => vendor._id),
                    datasets: [{
                        label: 'Ventas por Proveedor',
                        data: data[3].map(vendor => vendor.totalVendorSales),
                        backgroundColor: 'rgba(255, 99, 132, 0.5)'
                    }]
                }
            });
        }

        loadChartData();
    }, []);

    const { stockData, salesData, purchaseData, vendorData } = chartsData;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            maxWidth: '1200px',
            paddingTop: '70px',
            margin: 'auto'
        }}>
            <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '1rem'
            }}>Gestión de Stock y Ventas</h1>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <div style={{ width: '48%' }}>
                    {stockData && <Bar data={stockData} options={{ scales: { y: { beginAtZero: true } } }} />}
                </div>
                <div style={{ width: '24%', marginRight: '100px'}}>
                    {salesData && <Pie data={salesData} />}
                </div>
                <div style={{ width: '48%'}}>
                    {purchaseData && <Line data={purchaseData} options={{ scales: { y: { beginAtZero: true } } }} />}
                </div>
                <div style={{ width: '48%' }}>
                    {vendorData && <Bar data={vendorData} options={{ scales: { y: { beginAtZero: true } } }} />}
                </div>
            </div>
        </div>
    );


}

export default Dashboard;
