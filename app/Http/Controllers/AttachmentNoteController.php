<?php

namespace App\Http\Controllers;

use App\Http\Requests\AttachmentNote\StoreAttachmentNoteRequest;
use App\Http\Requests\AttachmentNote\UpdateAttachmentNoteRequest;
use App\Http\Resources\AttachmentNoteResource;
use App\Models\AttachmentNote;
use App\Support\Interfaces\Services\AttachmentNoteServiceInterface;
use Illuminate\Http\Request;

class AttachmentNoteController extends Controller
{
    public function __construct(protected AttachmentNoteServiceInterface $AttachmentNoteService) {}

    public function index(Request $request)
    {
        $perPage = $request->get('perPage', 10);
        $data = AttachmentNoteResource::collection($this->AttachmentNoteService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('AttachmentNote/Index');
    }

    public function create()
    {
        return inertia('AttachmentNote/Create');
    }

    public function store(StoreAttachmentNoteRequest $request)
    {
        if ($this->ajax()) {
            return $this->AttachmentNoteService->create($request->validated());
        }
    }

    public function show(AttachmentNote $AttachmentNote)
    {
        $data = AttachmentNoteResource::make($AttachmentNote);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('AttachmentNote/Show', compact('data'));
    }

    public function edit(AttachmentNote $AttachmentNote)
    {
        $data = AttachmentNoteResource::make($AttachmentNote);

        return inertia('AttachmentNote/Edit', compact('data'));
    }

    public function update(UpdateAttachmentNoteRequest $request, AttachmentNote $AttachmentNote)
    {
        if ($this->ajax()) {
            return $this->AttachmentNoteService->update($AttachmentNote, $request->validated());
        }
    }

    public function destroy(AttachmentNote $AttachmentNote)
    {
        if ($this->ajax()) {
            return $this->AttachmentNoteService->delete($AttachmentNote);
        }
    }
}
