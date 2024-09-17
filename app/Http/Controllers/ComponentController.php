<?php

namespace App\Http\Controllers;

use App\Http\Requests\Component\StoreComponentRequest;
use App\Http\Requests\Component\UpdateComponentRequest;
use App\Http\Resources\ComponentResource;
use App\Models\Component;
use App\Support\Enums\IntentEnum;
use App\Support\Interfaces\Services\ComponentServiceInterface;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class ComponentController extends Controller {
    public function __construct(protected ComponentServiceInterface $componentService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        if ($this->ajax()) {
            $intent = $request->get('intent');

            switch ($intent) {
                case IntentEnum::WEB_COMPONENT_GET_TEMPLATE_IMPORT_COMPONENT->value:
                    return $this->componentService->getImportDataTemplate();
            }

            try {
                $perPage = request()->get('perPage', 5);

                return ComponentResource::collection($this->componentService->getAllPaginated($request->query(), $perPage));
            } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
            }
        }

        return inertia('Component/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return inertia('Component/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreComponentRequest $request) {
        if ($this->ajax()) {
            $intent = $request->get('intent');

            switch ($intent) {
                case IntentEnum::WEB_COMPONENT_IMPORT_COMPONENT->value:
                    $this->componentService->importData($request->file('import_file'));

                    return response()->noContent();
            }

            return $this->componentService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Component $component) {
        if ($this->ajax()) {
            return new ComponentResource($component->load('progress'));
        }

        return inertia('Component/Show', compact('component'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Component $component) {
        return inertia('Component/Edit', compact('component'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateComponentRequest $request, Component $component) {
        if ($this->ajax()) {
            return $this->componentService->update($component, $request->validated());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Component $component) {
        if ($this->ajax()) {
            return $this->componentService->delete($component);
        }
    }
}
