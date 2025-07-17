import {createClient} from "@supabase/supabase-js";
import CategoryList from "@/app/categories/clientFunctions";
import Link from 'next/link';
const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey=process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase=createClient(supabaseUrl, supabaseKey);

export default async function Categories() {
    let categories:any = [];
  try{
    let { data:categoryArr, error:apiError }=await supabase
        .from('Category')
        .select('*');
    console.log(categoryArr);

    if(apiError) throw apiError;
    categories=categoryArr ?? [];
  }catch(err){
    //network error
    console.error(err);
  }
  
  return (
    <div className="bg-white">
        <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Shop by Collection</h2>
        <p className="mt-4 text-base text-gray-500">
          Each season, we collaborate with world-class designers to create a collection inspired by the natural world.
        </p>

        <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-x-8">
          {categories.map((category:any) => (
            <Link key={category.category_name} href={"/categories/"+category.category_name} className="group block">
              <img
                alt="item"
                src="https://www.premier-health.co.uk/images/pharmacy/Own_Label_Market_Pharmacy_Range.png"
                className="aspect-3/2 w-full rounded-lg object-cover group-hover:opacity-75 lg:aspect-5/6"
              />
              <h3 className="mt-4 text-base font-semibold text-gray-900">{category.category_name}</h3>
              <p className="mt-2 text-sm text-gray-500">Item Description</p>
            </Link>
          ))}
        </div>
      </div>
    </div>

  );
}