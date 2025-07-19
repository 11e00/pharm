import { createClient } from "@supabase/supabase-js";
import LoadProducts from "./clientFunctions";
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function CategoryPage({ params }: { params: { category: string } }) {
    const urlCategoryName = params.category;
    let categoryName:any = [];
    let categoryID:any = [];
    let products:any=[];

    try {
        const { data: categoryNameData, error: apiError } = await supabase
            .from('Category')
            .select('category_name')
            .eq('category_name', urlCategoryName);

        if (apiError) throw apiError;
        categoryName=categoryNameData[0]?.category_name ?? [];

    } catch (err) {
        //network error
        console.error(err);
    }

    if(urlCategoryName!=categoryName)
        notFound();

    try {
        const { data: categoryIDdata, error: apiError } = await supabase
            .from('Category')
            .select('category_id')
            .eq('category_name', urlCategoryName);

        if (apiError) throw apiError;
        categoryID=categoryIDdata[0].category_id ?? [];

    } catch (err) {
        //network error
        console.error(err);
    }

    switch(categoryID){
        case 1:
            console.log("bruh")
            try {
                const { data: productArr, error: apiError } = await supabase
                    .from('Drug')
                    .select('drug_id, name, price, thumbnail_id, stock, visible, Category!inner(category_id, category_name)');

                if (apiError) throw apiError;
                products=productArr ?? [];

            } catch (err) {
                console.error('Error fetching products:', err);
            }
            break;

        default:
            try {
                const { data: productArr, error: apiError } = await supabase
                    .from('Drug')
                    .select('drug_id, name, price, thumbnail_id, stock, visible, Category!inner(category_id, category_name)')
                    .eq('category_id', categoryID);

                if (apiError) throw apiError;
                products=productArr ?? [];
                
            } catch (err) {
                console.error('Error fetching products:', err);
            }
            break;
    }

    let images:any=[];
    for(let i=0;i<products.length;i++){
        try {
            const { data: imgArr, error: apiError } = await supabase
                .from('Images')
                .select('*')
                .eq('img_id', products[i].thumbnail_id);

            if (apiError) throw apiError;
            images[i]=imgArr[0]?.imgSrc ?? [];
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    }

    return (
        <LoadProducts currentCategory={urlCategoryName} products={products} images={images}/>
    );
}
