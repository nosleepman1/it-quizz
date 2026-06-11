<?php

namespace App\Http\Controllers;

use App\Models\Choice;
use App\Http\Resources\ChoiceResource;
use App\Http\Requests\StoreChoiceRequest;
use App\Http\Requests\UpdateChoiceRequest;
use Illuminate\Http\Request;

class ChoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $choice = Choice::all();
        return ChoiceResource::collection($choice);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreChoiceRequest $request)
    {
        $choice = Choice::create($request->validated());
        return new ChoiceResource($choice);
    }

    /**
     * Display the specified resource.
     */
    public function show(Choice $choice)
    {
        return new ChoiceResource($choice);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChoiceRequest $request, Choice $choice)
    {
        $choice->update($request->validated());
        return new ChoiceResource($choice);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Choice $choice)
    {
        $choice->delete();
        return response()->json('Choice deleted successfully', 200);
    }
}

