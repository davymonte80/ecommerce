import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function ProductList() {
/**
 * Adds a product to the cart.
 *
 * @param {string} productId - The ID of the product to add to the cart.
 */
  const addToCart = (productId) => {
    // addToCart 
    console.log(`Product ${productId} added to cart`);
  };
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get('/api/v1/products').then(res => res.data)
  });

  if (isLoading) return <div>Loading...</div>;

return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
            <div key={product.id} className="border p-4 rounded">
                {/* Product name */}
                <h3 className="text-lg font-bold">{product.name}</h3>
                {/* Product description */}
                <p className="text-gray-600">{product.description}</p>
                {/* Product price */}
                <p className="text-lg font-bold">${product.price}</p>
                {/* Add to Cart button */}
                <button 
                    onClick={() => addToCart(product.id)} 
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add to Cart
                </button>
            </div>
        ))}
    </div>
);
}
