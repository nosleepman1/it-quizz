<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ThemeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubcategoryController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ChoiceController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\ScoreController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\UserProgressController;
use App\Http\Controllers\BadgeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Auth\RegisteredUserController;

// Public API Authentication routes
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [RegisteredUserController::class, 'store']);

// Protected API routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Custom routes for quiz execution
    Route::post('quizzes/quick-play', [QuizController::class, 'quickPlay']);
    Route::post('quizzes/custom-play', [QuizController::class, 'customPlay']);
    Route::post('quizzes/{quiz}/complete', [QuizController::class, 'complete']);

    // Resource routes
    Route::apiResource('themes', ThemeController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('subcategories', SubcategoryController::class);
    Route::apiResource('topics', TopicController::class);
    Route::apiResource('questions', QuestionController::class);
    Route::apiResource('choices', ChoiceController::class);
    Route::apiResource('quizzes', QuizController::class);
    Route::apiResource('scores', ScoreController::class);
    Route::apiResource('leaderboards', LeaderboardController::class);
    Route::apiResource('user-progress', UserProgressController::class);
    Route::apiResource('badges', BadgeController::class);
    Route::apiResource('users', UserController::class);
});
