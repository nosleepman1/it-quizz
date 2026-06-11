<?php

namespace App\Http\Controllers;

use App\Models\UserProgress;
use App\Http\Resources\UserProgressResource;
use App\Http\Requests\StoreUserProgressRequest;
use App\Http\Requests\UpdateUserProgressRequest;
use Illuminate\Http\Request;

class UserProgressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userprogress = UserProgress::all();
        return UserProgressResource::collection($userprogress);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserProgressRequest $request)
    {
        $userprogress = UserProgress::create($request->validated());
        return new UserProgressResource($userprogress);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserProgress $userprogress)
    {
        return new UserProgressResource($userprogress);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserProgressRequest $request, UserProgress $userprogress)
    {
        $userprogress->update($request->validated());
        return new UserProgressResource($userprogress);
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

