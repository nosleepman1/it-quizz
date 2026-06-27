<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use App\Http\Resources\ThemeResource;
use App\Http\Requests\StoreThemeRequest;
use App\Http\Requests\UpdateThemeRequest;
use Illuminate\Http\Request;

class ThemeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $theme = Theme::all();
        return ThemeResource::collection($theme);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreThemeRequest $request)
    {
        $theme = Theme::create($request->validated());
        return new ThemeResource($theme);
    }

    /**
     * Display the specified resource.
     */
    public function show(Theme $theme)
    {
        return new ThemeResource($theme);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateThemeRequest $request, Theme $theme)
    {
        $theme->update($request->validated());
        return new ThemeResource($theme);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Theme $theme)
    {
        $theme->delete();
        return response()->json('Theme deleted successfully', 200);
    }
}

