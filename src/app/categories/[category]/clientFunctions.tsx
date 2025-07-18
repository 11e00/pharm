'use client';

type Products = {
    drug_id: string;
    price: string;
    name: string;
    stock: string;
    visible: string;
    category_name: string;
};

export default function ProdList({ product_categories }: { product_categories: Products[] }) {
    function LoadCatProd(prod: Products) {
        console.log('Category selected:', prod);
        if (prod.drug_id == '1') {

        }
    }

    return (
        <div className="categories">
            {product_categories.map((prod) => (
                <div key={prod.drug_id} onClick={() => LoadCatProd(prod)} style={{ cursor: 'pointer' }}>
                    [ {prod.name} ]
                </div>
            ))}
        </div>
    );
}
