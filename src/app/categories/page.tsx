import {createClient} from "@supabase/supabase-js";
import LoadCategories from "./clientFunctions";
const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey=process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase=createClient(supabaseUrl, supabaseKey);

export default async function Categories() {
    let categories:any = [];
  try{
    let { data:categoryArr, error:apiError }=await supabase.from('Category').select('*').order('category_id', { ascending: true });
    console.log(categoryArr);

    if(apiError) throw apiError;
    categories=categoryArr ?? [];
  }catch(err){
    //network error
    console.error(err);
  }
  
  return (
    <LoadCategories categories={categories}/>
  );
}