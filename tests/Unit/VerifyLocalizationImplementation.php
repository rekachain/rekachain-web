<?php

use Illuminate\Support\Facades\File;

// Recursively get all keys in an associative array, flattening them into dot notation.
function getLocalizationKeys(array $array, string $prefix = ''): array {
    $keys = [];
    foreach ($array as $key => $value) {
        $fullKey = $prefix . $key;
        if (is_array($value)) {
            $keys = array_merge($keys, getLocalizationKeys($value, $fullKey . '.'));
        } else {
            $keys[] = $fullKey;
        }
    }

    return $keys;
}

// Load a localization file and return all keys in dot notation.
function loadLocalizationKeys(string $filePath): array {
    if (!File::exists($filePath)) {
        throw new Exception("Localization file not found: $filePath");
    }
    $localizationArray = require $filePath;

    return getLocalizationKeys($localizationArray);
}

// Test if all localization files have the same keys as the reference language file.
test('Localization files should be synchronized', function () {
    $baseLang = 'en'; // Set the base language directory, e.g., 'en'
    $langPath = base_path('lang'); // Path to the main lang directory
    $baseDir = "$langPath/$baseLang";
    $localizationDirs = File::directories($langPath);

    // Arrays to accumulate missing and extra keys
    $allMissingKeys = [];
    $allExtraKeys = [];

    foreach ($localizationDirs as $langDir) {
        $lang = basename($langDir);
        if ($lang === $baseLang) {
            continue; // Skip the base language
        }

        foreach (File::allFiles($baseDir) as $baseFile) {
            $relativePath = $baseFile->getRelativePathname();
            $baseFilePath = $baseFile->getPathname();
            $compareFilePath = "$langPath/$lang/$relativePath";

            if (!File::exists($compareFilePath)) {
                $allMissingKeys["$lang:$relativePath"][] = 'File missing';

                continue;
            }

            // Load and compare keys
            $baseKeys = loadLocalizationKeys($baseFilePath);
            $compareKeys = loadLocalizationKeys($compareFilePath);

            $missingKeys = array_diff($baseKeys, $compareKeys);
            $extraKeys = array_diff($compareKeys, $baseKeys);

            // Accumulate missing and extra keys
            if (!empty($missingKeys)) {
                $allMissingKeys["$lang:$relativePath"] = $missingKeys;
            }
            if (!empty($extraKeys)) {
                $allExtraKeys["$lang:$relativePath"] = $extraKeys;
            }
        }
    }

    // Output accumulated missing and extra keys if any
    if (!empty($allMissingKeys) || !empty($allExtraKeys)) {
        if (!empty($allMissingKeys)) {
            dump('Missing keys:');
            foreach ($allMissingKeys as $file => $keys) {
                dump("File: $file", $keys);
            }
        }

        if (!empty($allExtraKeys)) {
            dump('Extra keys:');
            foreach ($allExtraKeys as $file => $keys) {
                dump("File: $file", $keys);
            }
        }
    } else {
        dump('Localization files are fully synchronized.');
    }

    // Assertions to ensure no missing or extra keys
    expect($allMissingKeys)->toBeEmpty();
    expect($allExtraKeys)->toBeEmpty();
});
