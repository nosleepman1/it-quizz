<?php

namespace App\Http\Controllers;

use App\Models\Score;
use App\Http\Resources\ScoreResource;
use App\Http\Requests\StoreScoreRequest;
use App\Http\Requests\UpdateScoreRequest;
use Illuminate\Http\Request;

class ScoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $score = Score::all();
        return ScoreResource::collection($score);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreScoreRequest $request)
    {
        $score = Score::create($request->validated());
        return new ScoreResource($score);
    }

    /**
     * Display the specified resource.
     */
    public function show(Score $score)
    {
        return new ScoreResource($score);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateScoreRequest $request, Score $score)
    {
        $score->update($request->validated());
        return new ScoreResource($score);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Score $score)
    {
        $score->delete();
        return response()->json('Score deleted successfully', 200);
    }
}

