<?php

namespace App\Http\Controllers;

use App\Models\Subcategory;
use App\Http\Resources\SubcategoryResource;
use App\Http\Requests\StoreSubcategoryRequest;
use App\Http\Requests\UpdateSubcategoryRequest;
use Illuminate\Http\Request;

class SubcategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subcategory = Subcategory::all();
        return SubcategoryResource::collection($subcategory);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSubcategoryRequest $request)
    {
        $subcategory = Subcategory::create($request->validated());
        return new SubcategoryResource($subcategory);
    }

    /**
     * Display the specified resource.
     */
    public function show(Subcategory $subcategory)
    {
        return new SubcategoryResource($subcategory);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubcategoryRequest $request, Subcategory $subcategory)
    {
        $subcategory->update($request->validated());
        return new SubcategoryResource($subcategory);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subcategory $subcategory)
    {
        $subcategory->delete();
        return response()->json('Subcategory deleted successfully', 200);
    }
}

