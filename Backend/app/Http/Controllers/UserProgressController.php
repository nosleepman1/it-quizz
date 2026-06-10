<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserProgressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userprogress = UserProgress::all();
        return UserProgressRessoucre::collection($userprogress);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(storeUserProgressRequest $request)
    {
        $userprogress = UserProgress::create($request->validated());
        return new UserProgressRessoucre($userprogress);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserProgress $userprogress)
    {
        return new UserProgressRessoucre($userprogress);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(updateUserProgressRequest $request, UserProgress $userprogress)
    {
        $userprogress->update($request->validated());
        return new UserProgressRessoucre($userprogress);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserProgress $userprogress)
    {
        $userprogress->delete();
        return response()->json('User progress deleted successfully', 200);
    }
}
