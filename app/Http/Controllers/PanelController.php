<?php

namespace App\Http\Controllers;

use App\Http\Requests\Panel\StorePanelRequest;
use App\Http\Requests\Panel\UpdatePanelRequest;
use App\Http\Resources\PanelResource;
use App\Models\Panel;
use App\Support\Interfaces\PanelServiceInterface;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class PanelController extends Controller
{
    public function __construct(protected PanelServiceInterface $panelService) { }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($this->ajax()) {
            try {
                $perPage = request()->get('perPage', 5);
                return PanelResource::collection($this->panelService->getAllPaginated($request->query(), $perPage));
            } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
            }
        }
        return inertia('Panel/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Panel/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePanelRequest $request)
    {
        if ($this->ajax()) {
            return $this->panelService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Panel $panel)
    {
        if ($this->ajax()) {
            return new PanelResource($panel);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Panel $panel)
    {
        return inertia('Panel/Edit', ['panel' => new PanelResource($panel)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePanelRequest $request, Panel $panel)
    {
        if ($this->ajax()) {
            return $this->panelService->update($request->validated());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Panel $panel)
    {
        if ($this->ajax()) {
            return $this->panelService->delete($panel);
        }
    }
}
