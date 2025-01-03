<?php

namespace App\Http\Controllers;

use App\Models\Leaderboard;
use App\Http\Resources\LeaderboardResource;
use App\Http\Requests\StoreLeaderboardRequest;
use App\Http\Requests\UpdateLeaderboardRequest;
use Illuminate\Http\Request;

class LeaderboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $leaderboard = Leaderboard::all();
        return LeaderboardResource::collection($leaderboard);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLeaderboardRequest $request)
    {
        $leaderboard = Leaderboard::create($request->validated());
        return new LeaderboardResource($leaderboard);
    }

    /**
     * Display the specified resource.
     */
    public function show(Leaderboard $leaderboard)
    {
        return new LeaderboardResource($leaderboard);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLeaderboardRequest $request, Leaderboard $leaderboard)
    {
        $leaderboard->update($request->validated());
        return new LeaderboardResource($leaderboard);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Leaderboard $leaderboard)
    {
        $leaderboard->delete();
        return response()->json('Leaderboard deleted successfully', 200);
    }
}

