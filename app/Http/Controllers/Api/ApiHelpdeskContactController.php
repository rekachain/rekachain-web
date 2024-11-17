<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\HelpdeskContact\StoreHelpdeskContactRequest;
use App\Http\Requests\HelpdeskContact\UpdateHelpdeskContactRequest;
use App\Http\Resources\HelpdeskContactResource;
use App\Models\HelpdeskContact;
use App\Support\Interfaces\Services\HelpdeskContactServiceInterface;
use Illuminate\Http\Request;

class ApiHelpdeskContactController extends ApiController {
    public function __construct(
        protected HelpdeskContactServiceInterface $helpdeskContactService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $perPage = request()->get('perPage', 5);

        return HelpdeskContactResource::collection($this->helpdeskContactService->getAllPaginated($request->query(), $perPage));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHelpdeskContactRequest $request) {
        return $this->helpdeskContactService->create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(HelpdeskContact $helpdeskContact) {
        return new HelpdeskContactResource($helpdeskContact->load(['roles' => ['division', 'permissions']]));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHelpdeskContactRequest $request, HelpdeskContact $helpdeskContact) {
        return $this->helpdeskContactService->update($helpdeskContact, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, HelpdeskContact $helpdeskContact) {
        return $this->helpdeskContactService->delete($helpdeskContact);
    }
}