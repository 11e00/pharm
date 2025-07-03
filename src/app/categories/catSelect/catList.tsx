'use client';

type Category = {
    category_id: string;
    category_name: string;
};

export default function CategoryList({ categories }: { categories: Category[] }) {
    function LoadCat(cat: Category) {
        console.log('Category clicked:', cat);
        if(cat.category_id=='1'){

        }
    }

    return (
        <div className="categories">
            {categories.map((cat) => (
                <div key={cat.category_id} onClick={() => LoadCat(cat)} style={{ cursor: 'pointer'}}>
                    [ {cat.category_name} ]
                </div>
            ))}
        </div>
    );
}
