import { useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import CategorySelect from "../components/CategorySelect";
import ProductTable from "../components/ProductTable";

function BrowseProducts() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >();

  return (
    <div>
      <h1>Products</h1>
      <div className="max-w-xs">
        <CategorySelect
          onChange={(category) => setSelectedCategoryId(category)}
        />
      </div>
      <ProductTable selectedCategoryId={selectedCategoryId} />
    </div>
  );
}

export default BrowseProducts;
