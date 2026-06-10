<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $question = Question::all();
        return QuestionRessoucre::collection($question);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(storeQuestionRequest $request)
    {
       $question = Question::create($request->validated());
       return new QuestionRessoucre($question);
    }

    /**
     * Display the specified resource.
     */
    public function show(Question $question)
    {
        return new QuestionRessoucre($question);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(updateQuestionRequest $request, Question $question)
    {
        $question->update($request->validated());
        return new QuestionRessoucre($question);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Question $question)
    {
        $question->delete();
        return response()->json('Question deleted successfully', 200);
    }
}
