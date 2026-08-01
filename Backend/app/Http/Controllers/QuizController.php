<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Http\Resources\QuizResource;
use App\Http\Requests\StoreQuizRequest;
use App\Http\Requests\UpdateQuizRequest;
use App\Events\QuizCompleted;
use App\Services\QuizGeneratorService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Exception;

class QuizController extends Controller
{
    public function __construct(private QuizGeneratorService $quizGeneratorService)
    {
    }

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
        $quiz = Quiz::create([...$request->validated(), 'user_id' => auth()->id(), 'status' => 'inachevé']);
        return new QuizResource($quiz);
    }

    /**
     * Display the specified resource.
     */
    public function show(Quiz $quiz)
    {
        $quiz->load('questions.choices');
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
        $quiz->update(['status' => 'complété']);
        
        // Déclencher l'événement score, badges et leaderboard
        event(new QuizCompleted(
            quiz: $quiz,
            user: Auth::user(),
            reponse: $request->reponses ?? [],
        ));
        return response()->json(['message' => 'Quiz completed successfully', 'quiz' => $quiz], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quiz $quiz)
    {
        $quiz->delete();
        return response()->json('Quiz deleted successfully', 200);
    }

    /**
     * Option 1 : Quiz Rapide (Thème uniquement -> 20 questions par défaut)
     */
    public function quickPlay(Request $request)
    {
        $request->validate([
            'theme_id' => 'required|exists:themes,id',
            'number_of_questions' => 'nullable|integer|min:1|max:50',
        ]);

        try {
            $numberOfQuestions = $request->number_of_questions ?? 20;
            $quiz = $this->quizGeneratorService->generateQuick(
                Auth::user(),
                $request->theme_id,
                $numberOfQuestions
            );
            return response()->json(['data' => $quiz], 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    /**
     * Option 2 : Quiz Personnalisé (Thème / Catégorie / Sous-catégorie / Topic)
     */
    public function customPlay(Request $request)
    {
        $request->validate([
            'theme_id' => 'nullable|exists:themes,id',
            'category_id' => 'nullable|exists:categories,id',
            'subcategory_id' => 'nullable|exists:subcategories,id',
            'topic_id' => 'nullable|exists:topics,id',
            'number_of_questions' => 'nullable|integer|min:1|max:50',
        ]);

        try {
            $numberOfQuestions = $request->number_of_questions ?? 10;
            $quiz = $this->quizGeneratorService->generateCustom(
                Auth::user(),
                $request->only(['theme_id', 'category_id', 'subcategory_id', 'topic_id']),
                $numberOfQuestions
            );
            return response()->json(['data' => $quiz], 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }
}
