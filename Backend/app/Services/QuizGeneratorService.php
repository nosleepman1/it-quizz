<?php
namespace App\Services;

use App\Models\Question;
use App\Models\Quiz;
use App\Models\Topic;
use App\Models\Subcategory;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Question;


class QuizGeneratorService {
    //scenarion 1 quiz rapide 
    public function generateQuick(User $user,int $themeId, int $numberOfQuestion = 15): Quiz{
        $question = Question::whereHas('topic.subCategory.Category.theme',function ($q)
         use ($themeId){
            $q->where('id',$themeId);
         })
         ->where('is_active',true)
         ->inRandomOrder()
         ->take($numberOfQuestion)
         ->with('choices')
         ->get();

         $Quiz = Quiz::create([
            'user_id' => $user->id,
            'theme_id' => $themeId,
            'difficulty' => $question->first()->topic->difficulty,
            'status' => 'pending',
            'total_questions' => $numberOfQuestion,
            'total_correct_answer' => 0,
         ]);
         $quiz->questions()->attach($question->pluck('id'));
         $quiz->load('questions.choices');
         return $quiz;   
    }
  // scenarion 2 

  public function generateCustom(User $user , int $topicId, int $numberOfQuestion):Quiz{
      
    $question = Question::where('topic_id',$topicId)
    ->where('is_active',true)
    ->inRandomOrder()
    ->take($numberOfQuestion)
    ->with('choices')
    ->get();
    $Quiz = Quiz::create([
        'user_id' => $user->id,
        'topic_id' => $topicId,
        'difficulty' => $question->first()->topic->difficulty,
        'status' => 'pending',
        'total_questions' => $numberOfQuestion,
        'total_correct_answer' => 0,
     ]);
     $quiz->questions()->attach($question->pluck('id'));
     $quiz->load('questions.choices');
     return $quiz;   
    }
  }

   

   

