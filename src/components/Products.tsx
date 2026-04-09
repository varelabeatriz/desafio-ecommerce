import { useEffect, useState } from "react";
import { useProductsContext } from "../contexts/ProductsContext";
import type { Product } from "../types/product";
import Pagination from "./Pagination";

function Products(){
    const {
      products,
      currentPage,
      totalPages,
      total,
      skip,
      hasNextPage,
      hasPrevPage,
      nextPage,
      prevPage,
    } = useProductsContext();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const galleryImages = selectedProduct?.images?.length
      ? selectedProduct.images
      : selectedProduct?.thumbnail
        ? [selectedProduct.thumbnail]
        : [];

    function openProductModal(product: Product) {
      setSelectedProduct(product);
      setActiveImageIndex(0);
    }

    function closeProductModal() {
      setSelectedProduct(null);
      setActiveImageIndex(0);
    }

    function goToPrevImage() {
      if (!galleryImages.length) return;
      setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    }

    function goToNextImage() {
      if (!galleryImages.length) return;
      setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    }

    useEffect(() => {
      if (!selectedProduct) return;

      function handleEscKey(event: KeyboardEvent) {
        if (event.key === "Escape") {
          closeProductModal();
        }
      }

      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscKey);

      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", handleEscKey);
      };
    }, [selectedProduct]);

    return (
        <div className="container mx-auto p-4">
  {products.length > 0 ? (
    <>
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <div
        key={product.id}
        className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition flex flex-col cursor-pointer"
        onClick={() => openProductModal(product)}
      >
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
      
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2 font-playfair">
            {product.title}
          </h2>

          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 mb-2 capitalize">
            {product.category}
          </span>
      
          <p className="text-green-600 font-bold text-md mb-3">
            R${product.price}
          </p>

          <p className="text-sm text-red-600 font-semibold mb-3">
            {Math.round(product.discountPercentage)} OFF%
          </p>
        </div>
      
        <button
          className="mt-auto w-full bg-blue-900 cursor-pointer text-white py-2 rounded-lg hover:bg-gray-800 transition"
          onClick={(event) => event.stopPropagation()}
        >
          Comprar
        </button>
      </div>
      ))}
    </div>
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      total={total}
      skip={skip}
      currentCount={products.length}
      hasPrevPage={hasPrevPage}
      hasNextPage={hasNextPage}
      onPrevPage={prevPage}
      onNextPage={nextPage}
    />
    </>
  ) : (
    <p className="text-center text-gray-500">Carregando...</p>
  )}
  {selectedProduct && (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      onClick={closeProductModal}
    >
      <div
        className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl"
          onClick={closeProductModal}
        >
          &times;
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="relative">
              <img
                src={galleryImages[activeImageIndex] || selectedProduct.thumbnail}
                alt={selectedProduct.title}
                className="w-full h-80 object-cover rounded-xl"
              />
              {galleryImages.length > 1 && (
                <>
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 px-3 py-1 rounded-full"
                    onClick={goToPrevImage}
                  >
                    {"<"}
                  </button>
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 px-3 py-1 rounded-full"
                    onClick={goToNextImage}
                  >
                    {">"}
                  </button>
                </>
              )}
            </div>

            {galleryImages.length > 1 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {galleryImages.map((image, index) => (
                  <img
                    key={`${selectedProduct.id}-${index}`}
                    src={image}
                    alt={`${selectedProduct.title} ${index + 1}`}
                    className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                      activeImageIndex === index ? "border-blue-600" : "border-transparent"
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 font-playfair mb-2">{selectedProduct.title}</h2>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

            <div className="space-y-2 mb-6">
              <p className="text-2xl font-bold text-green-700">{selectedProduct.price}</p>
              <p className="text-red-600 font-semibold">
                Desconto: {selectedProduct.discountPercentage.toFixed(2)}%
              </p>
              <p className="text-gray-700">Marca: {selectedProduct.brand || "N/A"}</p>
              <p className="text-gray-700 capitalize">Categoria: {selectedProduct.category}</p>
              <p className="text-gray-700">Estoque: {selectedProduct.stock}</p>
              <p className="text-gray-700">Avaliacao: {selectedProduct.rating}/5</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold font-playfair mb-2">Reviews</h3>
              {selectedProduct.reviews?.length ? (
                <div className="space-y-3">
                  {selectedProduct.reviews.map((review, index) => (
                    <div key={`${review.reviewerEmail}-${index}`} className="border rounded-lg p-3">
                      <p className="font-semibold">{review.reviewerName}</p>
                      <p className="text-sm text-gray-600">Nota: {review.rating}/5</p>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(review.date).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Sem reviews disponiveis.</p>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold font-playfair mb-2">Informacoes Adicionais</h3>
              <div className="space-y-1 text-sm text-gray-700">
                <p>SKU: {selectedProduct.sku || "N/A"}</p>
                <p>Peso: {selectedProduct.weight ? `${selectedProduct.weight} kg` : "N/A"}</p>
                <p>
                  Dimensoes:{" "}
                  {selectedProduct.dimensions
                    ? `${selectedProduct.dimensions.width} x ${selectedProduct.dimensions.height} x ${selectedProduct.dimensions.depth}`
                    : "N/A"}
                </p>
                <p>Garantia: {selectedProduct.warrantyInformation || "N/A"}</p>
                <p>Envio: {selectedProduct.shippingInformation || "N/A"}</p>
                <p>Status: {selectedProduct.availabilityStatus || "N/A"}</p>
                <p>Politica de devolucao: {selectedProduct.returnPolicy || "N/A"}</p>
                <p>Pedido minimo: {selectedProduct.minimumOrderQuantity || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
</div>
    )
}

export default Products;
