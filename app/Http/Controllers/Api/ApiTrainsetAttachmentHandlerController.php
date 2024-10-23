<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TrainsetAttachmentHandlerResource;
use App\Models\TrainsetAttachmentHandler;
use Illuminate\Http\Request;

class ApiTrainsetAttachmentHandlerController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $trainsetAttachmentId = $request->get('trainset_attachment_id');

        return TrainsetAttachmentHandlerResource::collection(TrainsetAttachmentHandler::whereTrainsetAttachmentId($trainsetAttachmentId)->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        //
    }
}