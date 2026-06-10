<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::all();
        return UserRessoucre::collection($user);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(storeUserRequest $request)
    {
        $user = User::create($request->validated());
        return new UserRessoucre($user);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserRessoucre($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(updateUserRequest $request, User $user)
    {
        $user->update($request->validated());
        return new UserRessoucre($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json('User deleted successfully', 200);
    }
}
