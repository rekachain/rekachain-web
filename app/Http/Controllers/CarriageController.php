<?php

namespace App\Http\Controllers;

use App\Http\Requests\Carriage\StoreCarriageRequest;
use App\Http\Requests\Carriage\UpdateCarriageRequest;
use App\Http\Resources\CarriageResource;
use App\Models\Carriage;
use App\Support\Enums\PermissionEnum;
use App\Helpers\PermissionHelper;
use App\Support\Enums\IntentEnum;
use App\Support\Interfaces\Services\CarriageServiceInterface;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class CarriageController extends Controller {
    public function __construct(protected CarriageServiceInterface $carriageService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        PermissionHelper::check(PermissionEnum::CARRIAGE_READ);
        if ($this->ajax()) {

            $intent = $request->get('intent');

            switch ($intent) {
                case IntentEnum::WEB_CARRIAGE_GET_TEMPLATE_IMPORT_CARRIAGE->value:
                    PermissionHelper::check(PermissionEnum::CARRIAGE_IMPORT);
                    return $this->carriageService->getImportDataTemplate();
            }

            try {
                $perPage = request()->get('perPage', 5);

                return CarriageResource::collection($this->carriageService->getAllPaginated($request->query(), $perPage));
            } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
            }
        }

        return inertia('Carriage/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        PermissionHelper::check(PermissionEnum::CARRIAGE_CREATE);
        return inertia('Carriage/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCarriageRequest $request) {
        PermissionHelper::check(PermissionEnum::CARRIAGE_CREATE);
        if ($this->ajax()) {
            $intent = $request->get('intent');

            switch ($intent) {
                case IntentEnum::WEB_CARRIAGE_IMPORT_CARRIAGE->value:
                    PermissionHelper::check(PermissionEnum::CARRIAGE_IMPORT);
                    $this->carriageService->importData($request->file('import_file'));

                    return response()->noContent();
            }

            return $this->carriageService->create($request->validated());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Carriage $carriage) {
        PermissionHelper::check(PermissionEnum::CARRIAGE_READ);
        if ($this->ajax()) {
            return new CarriageResource($carriage);
        }

        return inertia('Carriage/Show', ['carriage' => new CarriageResource($carriage)]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Carriage $carriage) {
        PermissionHelper::check(PermissionEnum::CARRIAGE_UPDATE);
        return inertia('Carriage/Edit', ['carriage' => new CarriageResource($carriage)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarriageRequest $request, Carriage $carriage) {
        PermissionHelper::check(PermissionEnum::CARRIAGE_UPDATE);
        if ($this->ajax()) {

            return $this->carriageService->update($carriage, $request->validated());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Carriage $carriage) {
        PermissionHelper::check(PermissionEnum::CARRIAGE_DELETE);
        if ($this->ajax()) {
            return $this->carriageService->delete($carriage);
        }
    }
}
