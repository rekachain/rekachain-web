<?php

namespace App\Http\Controllers;

use App\Http\Requests\PendingAttachmentNote\StorePendingAttachmentNoteRequest;
use App\Http\Requests\PendingAttachmentNote\UpdatePendingAttachmentNoteRequest;
use App\Http\Resources\PendingAttachmentNoteResource;
use App\Models\PendingAttachmentNote;
use App\Support\Interfaces\Services\PendingAttachmentNoteServiceInterface;
use Illuminate\Http\Request;

class PendingAttachmentNoteController extends Controller {
    public function __construct(protected PendingAttachmentNoteServiceInterface $pendingAttachmentNoteService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $data = PendingAttachmentNoteResource::collection($this->pendingAttachmentNoteService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('PendingAttachmentNote/Index');
    }

    public function create() {
        return inertia('PendingAttachmentNote/Create');
    }

    public function store(StorePendingAttachmentNoteRequest $request) {
        if ($this->ajax()) {
            return $this->pendingAttachmentNoteService->create($request->validated());
        }
    }

    public function show(PendingAttachmentNote $pendingAttachmentNote) {
        $data = PendingAttachmentNoteResource::make($pendingAttachmentNote);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('PendingAttachmentNote/Show', compact('data'));
    }

    public function edit(PendingAttachmentNote $pendingAttachmentNote) {
        $data = PendingAttachmentNoteResource::make($pendingAttachmentNote);

        return inertia('PendingAttachmentNote/Edit', compact('data'));
    }

    public function update(UpdatePendingAttachmentNoteRequest $request, PendingAttachmentNote $pendingAttachmentNote) {
        if ($this->ajax()) {
            return $this->pendingAttachmentNoteService->update($pendingAttachmentNote, $request->validated());
        }
    }

    public function destroy(PendingAttachmentNote $pendingAttachmentNote) {
        if ($this->ajax()) {
            return $this->pendingAttachmentNoteService->delete($pendingAttachmentNote);
        }
    }
}