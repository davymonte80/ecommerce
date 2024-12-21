import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // Import hooks from react-query
import axios from 'axios'; // Import axios for making HTTP requests

export default function Cart() {
    const queryClient = useQueryClient(); // Initialize queryClient for cache management
    
    // Fetch cart items using useQuery hook
    const { data: cartItems, isLoading } = useQuery({
        queryKey: ['cart'], // Unique key for the query
        queryFn: () => axios.get('/api/v1/cart').then(res => res.data) // Fetch cart data from API
    });

    // Mutation to remove item from cart
    const removeFromCart = useMutation({
        mutationFn: (productId) => axios.delete(`/api/v1/cart/${productId}`), // Delete request to remove item
        onSuccess: () => queryClient.invalidateQueries(['cart']) // Invalidate cart query to refetch data
    });

    // Mutation to create an order
    const createOrder = useMutation({
        mutationFn: () => axios.post('/api/v1/orders'), // Post request to create an order
        onSuccess: () => {
            queryClient.invalidateQueries(['cart']); // Invalidate cart query to refetch data
            queryClient.invalidateQueries(['orders']); // Invalidate orders query to refetch data
        }
    });

    if (isLoading) return <div>Loading...</div>; // Show loading state while fetching data

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {cartItems.map(item => ( // Map through cart items and display each item
                <div key={item.product.id} className="flex justify-between items-center border-b py-2">
                    <div>
                        <h3>{item.product.name}</h3> 
                        <p>Quantity: {item.quantity}</p> 
                        <p>Price: ${item.product.price * item.quantity}</p>
                    </div>
                    <button
                        onClick={() => removeFromCart.mutate(item.product.id)} // Remove item from cart on button click
                        className="text-red-500"
                    >
                        Remove
                    </button>
                </div>
            ))}
            <button
                onClick={() => createOrder.mutate()} // Create order on button click
                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            >
                Place Order
            </button>
        </div>
    );
}
