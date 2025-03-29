<?php

namespace App\Http\Controllers\Api;

use App\Models\ScanFace;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\ScanFaceResource;

class ApiScanFaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dataSpv = auth()->user()->roles()->first()->name;

        if ($dataSpv == "Supervisor - Mekanik")
        {
            $users = ScanFace::whereHas('user', function($query) {
                $query->whereHas('roles', function($q) {
                    $q->whereIn('roles.id', [7,10]);
                });
            })->get();

            return ScanFaceResource::collection($users);

        }else if ($dataSpv == "Supervisor - Elektrik"){
            $users = ScanFace::whereHas('user', function($query) {
                $query->whereHas('roles', function($q) {
                    $q->whereIn('roles.id', [8,11]);
                });
            })->get();

            return ScanFaceResource::collection($users);

        }else {
            $users = ScanFace::whereHas('user', function($query) {
                $query->whereHas('roles', function($q) {
                    $q->whereIn('roles.id', [9,11]);
                });
            })->get();

            return ScanFaceResource::collection($users);

        }
    }

    public function checkDataset(Request $request)
    {
        $userNip = $request->nip;

        $path = 'dataset_faces/' . $userNip;

        if (Storage::disk('public')->exists($path)) {
            return response()->json([
                'status' => 200,
                'message' => 'Dataset ditemukan untuk pengguna ' . $userNip
            ], 200);
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'Dataset tidak ditemukan untuk pengguna ' . $userNip
            ], 400);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     */
    public function show(ScanFace $scanFace)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ScanFace $scanFace)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ScanFace $scanFace)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ScanFace $scanFace)
    {
        //
    }
}
