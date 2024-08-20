<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TrainsetCarriages;
use Illuminate\Support\Facades\DB;
use Psr\Container\NotFoundExceptionInterface;
use Psr\Container\ContainerExceptionInterface;
use App\Http\Resources\TrainsetCarriagesResource;
use App\Support\Interfaces\TrainsetCarriagesServiceInterface;
use App\Http\Requests\TrainsetCarriages\StoreTrainsetCarriagesRequest;
use App\Http\Requests\TrainsetCarriages\UpdateTrainsetCarriagesRequest;

class TrainsetCarriagesController extends Controller
{
    public function __construct(
        protected TrainsetCarriagesServiceInterface $trainsetCarriagesService
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // if ($this->ajax()) {
        //     try {
        //         $perPage = request()->get('perPage', 5);
        //         return TrainsetCarriagesResource::collection($this->trainsetCarriagesService->getAllPaginated($request->query(), $perPage));
        //     } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
        //     }
        // }

        $perPage = request()->get('perPage', 5);
        return TrainsetCarriagesResource::collection(
            $this->trainsetCarriagesService->getAllPaginated($request->query(), $perPage)
        );
        // testing web
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return 'create';
        // return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTrainsetCarriagesRequest $request)
    {
        if($this->ajax()) {
            return $this->trainsetCarriagesService->create($request->validated());
        }
        //return $this->trainsetCarriagesService->create($request->validated());
        //tes web
    }

    /**
     * Display the specified resource.
     */
    public function show(String $id)
    {
        // $request->checkPermissionEnum(PermissionEnum::Trainset_READ);
        // return new TrainsetCarriagesResource($trainsetCarriages);

        // return [
        //     'id' => $trainsetCarriages->id,
        //     'trainset_id' => $trainsetCarriages->trainset_id,
        //     'carriage_id' => $trainsetCarriages->carriage_id,
        //     'qty' => $trainsetCarriages->qty
        // ];

        return DB::select('select * from trainset_carriages where id = ?', [$id]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TrainsetCarriages $trainsetCarriages)
    {
        return 'edit';
        // return inertia('TrainsetCarriages/Edit', ['trainsetCarriages' => new TrainsetCarriagesResource($trainsetCarriages)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTrainsetCarriageRequest $request, TrainsetCarriages $trainsetCarriages)
    {
        return 'update';
        // if ($this->ajax()) {
        //     return $this->trainsetCarriagesService->update($trainsetCarriages, $request->validated());
        // }

        return $this->trainsetCarriagesService->update($trainsetCarriages, $request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, TrainsetCarriages $trainsetCarriages)
    {
        return 'destroy';
        if ($this->ajax()) {
            return $this->trainsetCarriagesService->delete($trainsetCarriages);
        }
    }
}
