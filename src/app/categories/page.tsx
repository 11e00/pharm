import {createClient} from "@supabase/supabase-js";
import CategoryList from "@/app/categories/catList";
const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey=process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase=createClient(supabaseUrl, supabaseKey);

export default async function Categories() {
    let categories = [];

  try{
    let { data:category, error:apiError }=await supabase
        .from('Category')
        .select('*');
    console.log(category);

    if(apiError) throw apiError;
    categories=category ?? [];
  }catch(err){
    //network error
    console.error(err);
  }


  return (
      <div className="all">
        <h1>Categories</h1>
          <CategoryList categories={categories ?? []} />
      </div>
  );
}