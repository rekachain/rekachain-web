<?php

namespace Database\Seeders\Helpers;

class CsvReader {
    protected $filePath;
    protected $delimiter;

    public function __construct(string $fileName, string $delimiter = ',') {
        $this->filePath = base_path('database/data/' . $fileName . '.csv');
        $this->delimiter = $delimiter;
    }

    public function getCsvData() {
        if (file_exists($this->filePath)) {
            $csvData = array_map(function ($line) {
                return str_getcsv($line, $this->delimiter);
            }, file($this->filePath));
            array_walk($csvData, function (&$a) use ($csvData) {
                $a = array_map(function ($value) {
                    return $value !== '' ? $value : null;
                }, array_combine($csvData[0], $a));
            });
            array_shift($csvData); // remove column header
        } else {
            $csvData = null;
        }

        return $csvData;
    }
}
