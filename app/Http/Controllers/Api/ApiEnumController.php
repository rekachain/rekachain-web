<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ApiEnumController extends Controller {
    public function getEnumLabels(Request $request, string $enumName) {
        // Build the fully qualified class name
        $enumClass = "App\\Support\\Enums\\{$enumName}";

        // Check if the class exists and is an enum
        if (!class_exists($enumClass) || !method_exists($enumClass, 'getLocalizedLabels')) {
            return response()->json(['error' => 'Enum not found or not supported'], 404);
        }

        // Return the localized labels
        return response()->json($enumClass::getLocalizedLabels());
    }
}