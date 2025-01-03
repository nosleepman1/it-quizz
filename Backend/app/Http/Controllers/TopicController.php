<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Http\Resources\TopicResource;
use App\Http\Requests\StoreTopicRequest;
use App\Http\Requests\UpdateTopicRequest;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $topic = Topic::all();
        return TopicResource::collection($topic);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTopicRequest $request)
    {
        $topic = Topic::create($request->validated());
        return new TopicResource($topic);
    }

    /**
     * Display the specified resource.
     */
    public function show(Topic $topic)
    {
        return new TopicResource($topic);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTopicRequest $request, Topic $topic)
    {
        $topic->update($request->validated());
        return new TopicResource($topic);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Topic $topic)
    {
        $topic->delete();
        return response()->json('Topic deleted successfully', 200);
    }
}

