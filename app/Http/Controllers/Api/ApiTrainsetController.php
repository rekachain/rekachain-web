<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Trainset\StoreTrainsetRequest;
use App\Http\Requests\Trainset\UpdateTrainsetRequest;
use App\Http\Resources\TrainsetResource;
use App\Models\Trainset;
use App\Support\Interfaces\TrainsetServiceInterface;
use Illuminate\Http\Request;
use Log;

class ApiTrainsetController extends Controller
{
    public function __construct(
        protected TrainsetServiceInterface $trainsetService
    ){}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {   
        // $request->checkPermissionEnum(PermissionEnum::Trainset_READ);
        $perPage = request()->get('perPage', 15);
        return TrainsetResource::collection(
            $this->trainsetService->getAllPaginated($request->query(), $perPage)
        )->additional(['message' => 'Success']);
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTrainsetRequest $request)
    {
        // $request->checkPermissionEnum(PermissionEnum::Trainset_CREATE);
        return $this->trainsetService->create($request->validated());
    }
    
    /**
     * Display the specified resource.
     */
    public function show(Trainset $trainset)
    {
        // $request->checkPermissionEnum(PermissionEnum::Trainset_READ);
        return new TrainsetResource($trainset);
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTrainsetRequest $request, Trainset $trainset)
    {
        // $request->checkPermissionEnum(PermissionEnum::Trainset_UPDATE);
        return $this->trainsetService->update($trainset, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
