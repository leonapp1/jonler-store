import ProductCard from '../ProductCard/ProductCard';

function ProductGrid({ products, onAddToCart,onViewDetails }) { // Añadir prop
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            onAddToCart={onAddToCart}
            onViewDetails={onViewDetails} // Pasar la prop aquí
          />
        ))}
      </div>
    );
  }
  
  export default ProductGrid;