<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $category = Cyegory::all();
        return CategoryRessource::collection($category);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(storeCategoryRequest $request)
    {
        $category = Category::create($request->validated());
        return new CategoryRessource($category);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return new CategoryRessource($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(updateCategoryRequest $request, Category $category)
    {
            $category->update($request->validated());
            return new CategoryRessource($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
       $category->delete();
       return response()->json('Category deleted successfully', 200);
    }
}
