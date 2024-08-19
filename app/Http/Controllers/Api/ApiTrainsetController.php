<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Trainset\StoreTrainsetRequest;
use App\Http\Requests\Trainset\UpdateTrainsetRequest;
use App\Http\Resources\TrainsetResource;
use App\Models\Trainset;
// use App\Support\Interfaces\PermissionEnum;
use App\Support\Interfaces\TrainsetServiceInterface;
use Illuminate\Http\Request;

class ApiTrainsetController extends Controller
{
    public function __construct(
        protected TrainsetServiceInterface $trainsetService
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = request()->get('perPage', 15);
        return TrainsetResource::collection(
            $this->trainsetService->getAllPaginated(request()->query(), $perPage)
        )->additional(['message' => 'Success']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TrainsetStoreRequest $request)
    {
        return $this->trainsetService->create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Trainset $trainset)
    {
        return new TrainsetResource($trainset);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TrainsetUpdateRequest $request, Trainset $trainset)
    {
        return $this->trainsetService->update($trainset, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trainset $trainset)
    {
        //
    }
}
