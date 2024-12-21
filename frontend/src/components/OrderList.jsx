import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function OrderList() {
    // Use the useQuery hook to fetch orders data
    const { data: orders, isLoading } = useQuery({
        queryKey: ['orders'], // Unique key for the query
        queryFn: () => axios.get('/api/v1/orders').then(res => res.data) // Fetch orders from the API
    });

    // Show a loading message while the data is being fetched
    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
            {/* Map through the orders and display each order */}
            {orders.map(order => (
                <div key={order.id} className="border p-4 rounded mb-4">
                    <h3>Order #{order.id}</h3>
                    <p>Status: {order.status}</p>
                    <p>Total: ${order.total_amount}</p>
                    <div className="mt-2">
                        {/* Map through the items in each order and display them */}
                        {order.items.map(item => (
                            <div key={item.id} className="flex justify-between">
                                <span>{item.product.name}</span>
                                <span>x{item.quantity}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}