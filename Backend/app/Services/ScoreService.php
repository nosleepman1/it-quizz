<?php
namespace App\Services;
use App\Models\Question;
use App\Models\UserAnswer;
use App\Models\Score;
use App\Models\UserProgress;
use Illuminate\Support\Facades\Auth;

class ScoreService
{
    public function calculateScore(array $data): Score
    {
       $accuracy = $data['total_correct'] / $data['total_questions'] * 100;
       //Bonus point selon la difficulté
       $bonus = match($data['difficulty']){
        'facile' => 1,
        'moyen' => 1.5,
        'difficile' => 2,
       };

       $pointsEarned = $data['total_correct'] * 10 * $bonus;

       //cree le score en base de donnee
       $score = Score::create([
        'user_id' => Auth::user()->id,
        'topic_id' => $data['topic_id'],
        'points_earned' => $pointsEarned,
        'total_questions' => $data['total_questions'],
        'total_correct_answers' => $data['total_correct'],
        'accuracy' => $accuracy,
        'time_taken' => $data['time_taken'],
        'difficulty' => $data['difficulty'],
       ]);
       

       //mettre a jour la progression de l'utilisateur
       $this->updateProgress($data,$score);
       return $score;
 
    }

    private function updateProgress(array $data, Score $score): void
    {
        $user = Auth::user();
        $progress = UserProgress::firstOrCreate([
            'user_id' => $user->id,
            'topic_id' => $data['topic_id'],
        ]);

        $progress->increment('total_questions', $data['total_questions']);
        $progress->increment('total_correct_answers', $data['total_correct']);

        //calcule du mastery 
        $mastery = ($progress->total_correct_answers / $progress->total_questions) * 100;
        $progress->update([
            'mastery_level' => round($mastery),
            'last_practice_at' => now(),
        ]);
      
      
    }
}