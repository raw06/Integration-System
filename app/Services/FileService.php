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
        return collect($files)->map(function (UploadedFile $file) use( $type) {
            $extension = $file->extension();
            $fileName = "$type-".now()->timestamp;
            Storage::putFileAs("public/$type", $file, "$fileName.$extension");
            return config('app.url'). Storage::disk('local')->url("public/$type/$fileName.$extension");
        });

    }
}
