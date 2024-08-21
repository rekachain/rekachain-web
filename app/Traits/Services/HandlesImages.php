<?php

namespace App\Traits\Services;

use Illuminate\Support\Facades\Storage;

trait HandlesImages {
    /**
     * Handles image upload by storing the image in the specified directory and returning the updated data array.
     *
     * @param  array  $data  Array of data to be updated.
     * @param  mixed|null  $keyOrModel  Optional model instance or identifier for updating existing records.
     * @param  string  $imageField  Field name in the request that contains the image.
     * @param  string  $disk  Storage disk to be used for storing the image.
     * @param  string|null  $customPath  Optional custom path to store the image.
     * @return array Updated data array with the image path.
     */
    protected function handleImageUpload(array $data, mixed $keyOrModel = null, string $imageField = 'image_path', string $disk = 'public', ?string $customPath = null): array {
        if (request()->hasFile($imageField)) {
            // Use custom path if provided; otherwise, default to $this->imagePath
            $path = $customPath ?? $this->imagePath;

            // Delete old photo if updating
            if ($keyOrModel && $keyOrModel->$imageField) {
                $this->deleteImage($keyOrModel->$imageField, $disk);
            }

            // Store the new photo
            $data[$imageField] = request()->file($imageField)->store($path, $disk);
        }

        return $data;
    }

    /**
     * Deletes the image from storage.
     *
     * @param  string|null  $photoPath  Path of the image to be deleted.
     * @param  string  $disk  Storage disk from which to delete the image.
     */
    protected function deleteImage(?string $photoPath, string $disk = 'public'): void {
        if ($photoPath && Storage::disk($disk)->exists($photoPath)) {
            Storage::disk($disk)->delete($photoPath);
        }
    }
}
