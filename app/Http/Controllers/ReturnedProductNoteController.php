<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReturnedProductNote\StoreReturnedProductNoteRequest;
use App\Http\Requests\ReturnedProductNote\UpdateReturnedProductNoteRequest;
use App\Http\Resources\ReturnedProductNoteResource;
use App\Models\ReturnedProductNote;
use App\Support\Interfaces\Services\ReturnedProductNoteServiceInterface;
use Illuminate\Http\Request;

class ReturnedProductNoteController extends Controller {
    public function __construct(protected ReturnedProductNoteServiceInterface $returnedProductNoteService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $data = ReturnedProductNoteResource::collection($this->returnedProductNoteService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('ReturnedProductNote/Index');
    }

    public function create() {
        return inertia('ReturnedProductNote/Create');
    }

    public function store(StoreReturnedProductNoteRequest $request) {
        if ($this->ajax()) {
            return $this->returnedProductNoteService->create($request->validated());
        }
    }

    public function show(ReturnedProductNote $returnedProductNote) {
        $data = ReturnedProductNoteResource::make($returnedProductNote);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('ReturnedProductNote/Show', compact('data'));
    }

    public function edit(ReturnedProductNote $returnedProductNote) {
        $data = ReturnedProductNoteResource::make($returnedProductNote);

        return inertia('ReturnedProductNote/Edit', compact('data'));
    }

    public function update(UpdateReturnedProductNoteRequest $request, ReturnedProductNote $returnedProductNote) {
        if ($this->ajax()) {
            return $this->returnedProductNoteService->update($returnedProductNote, $request->validated());
        }
    }

    public function destroy(ReturnedProductNote $returnedProductNote) {
        if ($this->ajax()) {
            return $this->returnedProductNoteService->delete($returnedProductNote);
        }
    }
}