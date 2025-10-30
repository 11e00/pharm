import {createClient} from "@supabase/supabase-js";
import LoadCategories from "./clientFunctions";
import {supabase,API, category} from "@/app/db";

export default async function categories() {
    const categories:category[]=await API(supabase.from('category').select('*').order('category_id', { ascending: true }))?? [];
  return (
    <LoadCategories categories={categories}/>
  );
}