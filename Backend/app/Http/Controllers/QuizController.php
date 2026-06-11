<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $quiz = Quiz::all();
        return QuizRessouce::collection($quiz);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(storeQuizRequest $request)
    {
        $quiz = Quiz::create($request->validated());
        return new QuizRessouce($quiz);
    }

    /**
     * Display the specified resource.
     */
    public function show(Quiz $quiz)
    {
        return new QuizRessouce($quiz);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(updateQuizRequest $request, Quiz  $quiz)
    {
        $quiz->update($request->validated());
        return new QuizRessoucre($quiz);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quiz $quiz)
    {
        $quiz->delete();
        return response()->json('Quiz deleted successfully', 200);
    }
}
