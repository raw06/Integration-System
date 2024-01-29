<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class FileService {

    /**
     * @param UploadedFile[] $files
     * @param string $type
     *
     * @return mixed
     */
    public function storeFile(array $files, string $type = 'logo') {
        return collect($files)->filter(function (UploadedFile $file) {
            return $file->isReadable();
        })->map(function (UploadedFile $file) use ($type) {
            $extension = $file->extension() ?? 'png';
            $fileName = "$type-" . now()->getTimestamp().rand(1,100);
            Storage::putFileAs("public/$type", $file, "$fileName.$extension");
            return config('app.url') . Storage::disk('local')->url("public/$type/$fileName.$extension");
        });

    }
}
