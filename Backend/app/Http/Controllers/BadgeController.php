<?php

namespace App\Http\Controllers;

use App\Models\Badge;
use App\Http\Resources\BadgeResource;
use App\Http\Requests\StoreBadgeRequest;
use App\Http\Requests\UpdateBadgeRequest;
use Illuminate\Http\Request;

class BadgeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $badge = Badge::all();
        return BadgeResource::collection($badge);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBadgeRequest $request)
    {
        $badge = Badge::create($request->validated());
        return new BadgeResource($badge);
    }

    /**
     * Display the specified resource.
     */
    public function show(Badge $badge)
    {
        return new BadgeResource($badge);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBadgeRequest $request, Badge $badge)
    {
        $badge->update($request->validated());
        return new BadgeResource($badge);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Badge $badge)
    {
        $badge->delete();
        return response()->json('Badge deleted successfully', 200);
    }
}

