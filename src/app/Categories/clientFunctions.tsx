'use client';
import {LinkPreview} from '@/components/ui/link-preview';
import { category } from '@/app/db';

export default function LoadCategories({categories}:{categories:category[]}){
    return(
        <div className="bg-white">
            <div className="mx-auto max-w-xl px-4 py-4 pb-20 lg:max-w-7xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Shop by Collection</h2>
            <p className="mt-4 text-base text-gray-500">
            Each season, we collaborate with world-class designers to create a collection inspired by the natural world.
            </p>

            <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:space-y-12 lg:gap-x-8">
            {categories.map((category:category) => (
                <LinkPreview key={category.category_id} url={"/categories/"+category.category_name} className="group block">
                <img
                    alt="item"
                    src={category.category_image}
                    className="aspect-3/2 w-full rounded-lg object-cover group-hover:opacity-75 lg:aspect-5/6"
                />
                <h3 className="mt-4 text-base font-semibold text-gray-900">{category?.category_name?.replace("-"," ").split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</h3>
                <p className="mt-2 text-sm text-gray-500">{category.category_description}</p>
                </LinkPreview>
            ))}
            </div>
        </div>
        </div>

    );
}