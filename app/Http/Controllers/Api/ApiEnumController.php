<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ApiEnumController extends Controller {
    public function getEnumLabels(Request $request, string $enumName) {
        if ($enumName === 'all') {
            if ($request->has('enums')) {
                $enums = $request->get('enums');
                $localizedEnums = [];
                foreach ($enums as $enum) {
                    $enumClass = "App\\Support\\Enums\\{$enum}";
                    if (class_exists($enumClass) && method_exists($enumClass, 'getLocalizedLabels')) {
                        $localizedEnums[$enum] = $enumClass::getLocalizedLabels();
                    } else {
                        return response()->json(['error' => 'Enum ' . $enumClass . ' not found or not supported'], 404);
                    }
                }
                if (count($localizedEnums) > 0) {
                    return response()->json($localizedEnums);
                } else {
                    return response()->json(['error' => 'No enums localized'], 400);
                }
            } else {
                return response()->json(['error' => 'No enums provided'], 400);
            }
        } else {
            // Build the fully qualified class name
            $enumClass = "App\\Support\\Enums\\{$enumName}";
    
            // Check if the class exists and is an enum
            if (!class_exists($enumClass) || !method_exists($enumClass, 'getLocalizedLabels')) {
                return response()->json(['error' => 'Enum ' . $enumClass . ' not found or not supported'], 404);
            }
    
            // Return the localized labels
            return response()->json($enumClass::getLocalizedLabels());
        }
    }
}
