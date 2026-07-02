<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Http\Resources\QuizResource;
use App\Http\Requests\StoreQuizRequest;
use App\Http\Requests\UpdateQuizRequest;
use App\Events\QuizCompleted;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $quiz = Quiz::all();
        return QuizResource::collection($quiz);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuizRequest $request)
    {
        $quiz = Quiz::create([...$request->validated(), 'user_id' => auth()->id(), 'status' => 'pending']);
        return new QuizResource($quiz);
    }

    /**
     * Display the specified resource.
     */
    public function show(Quiz $quiz)
    {
        return new QuizResource($quiz);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuizRequest $request, Quiz $quiz)
    {
        $quiz->update($request->validated());
        return new QuizResource($quiz);
    }

    public function complete(Request $request, Quiz $quiz)
    {
        $quiz->update(['status' => 'completed']);
        
        //declancher levenement score plus badge plus leaderboard
        event(new QuizCompleted(
            quiz: $quiz,
            user: Auth::user(),
            reponse: $request->reponses ?? [],
        ));
        return response()->json('Quiz completed successfully', 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quiz $quiz)
    {
        $quiz->delete();
        return response()->json('Quiz deleted successfully', 200);
    }

    public function quickPlay(Request $request){
       $request->validate([
        'theme_id' => 'required|exists:themes,id'
       ]);
       $quiz = $this->quizGeneratorService->generateQuickPlay(Auth::user(),$request->theme_id);
       return response()->json($quiz, 200);
    }

    public function customPlay(Request $request){
        $request->validate([
            'topic_id' => 'required|exists:topics,id',
            'number_of_question' => 'required|integer|min:1',
        ]);
        $quiz = $this->quizGeneratorService->generateCustom(Auth::user(),$request->topic_id,$request->number_of_question);
        return response()->json($quiz, 200);
    }

}

