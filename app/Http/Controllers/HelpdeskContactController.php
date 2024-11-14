<?php

namespace App\Http\Controllers;

use App\Http\Requests\HelpdeskContact\StoreHelpdeskContactRequest;
use App\Http\Requests\HelpdeskContact\UpdateHelpdeskContactRequest;
use App\Http\Resources\HelpdeskContactResource;
use App\Models\HelpdeskContact;
use App\Support\Enums\RoleEnum;
use App\Support\Interfaces\Services\HelpdeskContactServiceInterface;
use Illuminate\Http\Request;

class HelpdeskContactController extends Controller {
    public function __construct(protected HelpdeskContactServiceInterface $helpdeskContactService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $data = HelpdeskContactResource::collection($this->helpdeskContactService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('HelpdeskContact/Index');
    }

    public function create() {
        return inertia('HelpdeskContact/Create');
    }

    public function store(StoreHelpdeskContactRequest $request) {
        checkRoles(RoleEnum::SUPER_ADMIN);

        if ($this->ajax()) {
            return $this->helpdeskContactService->create($request->validated());
        }
    }

    public function show(HelpdeskContact $helpdeskContact) {
        $data = HelpdeskContactResource::make($helpdeskContact);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('HelpdeskContact/Show', compact('data'));
    }

    public function edit(HelpdeskContact $helpdeskContact) {
        $data = HelpdeskContactResource::make($helpdeskContact);

        return inertia('HelpdeskContact/Edit', compact('data'));
    }

    public function update(UpdateHelpdeskContactRequest $request, HelpdeskContact $helpdeskContact) {
        checkRoles(RoleEnum::SUPER_ADMIN);

        if ($this->ajax()) {
            return $this->helpdeskContactService->update($helpdeskContact, $request->validated());
        }
    }

    public function destroy(HelpdeskContact $helpdeskContact) {
        checkRoles(RoleEnum::SUPER_ADMIN);

        if ($this->ajax()) {
            return $this->helpdeskContactService->delete($helpdeskContact);
        }
    }
}
