<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $choice = Choice::all();
        return ChoiceRessource::collection($choice);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(storeChoiceRequest $request)
    {
        $choice = Choice::create($request->validated());
        return new ChoiceRessource($choice);
    }

    /**
     * Display the specified resource.
     */
    public function show(Choice $choice)
    {
        return new ChoiceRessource($choice);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(updateChoiceRequest $request, Choice $choice)
    {
        $choice->update($request->validated());
        return new ChoiceRessource($choice);
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
