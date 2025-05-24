<?php

namespace App\Jobs\Dashboard;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class ProductProblemAnalysis implements ShouldBeUnique, ShouldQueue {
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $uniqueFor = 600; // 10 minutes

    /**
     * Create a new job instance.
     */
    public function __construct(protected array $data) {}

    public function uniqueId(): string {
        $key = md5(json_encode($this->data));

        return $key;
    }

    /**
     * Execute the job.
     */
    public function handle(): void {
        $start = microtime(true);
        foreach ($this->data as $value) {
            $productProblemAnalysis = \App\Models\ProductProblemAnalysis::where('component_name', $value->component_name)
                ->where('date_range', $value->date_range)
                ->first();
            if ($productProblemAnalysis) {
                continue;
            }
            $promptIdentity = "Jawab dengan bahasa Indonesia!.
                Anda adalah asisten diagnostik kendaraan kereta api. 
                Tugas Anda: Mengidentifikasi akar penyebab masalah dan merekomendasikan solusi sesuai dengan format berikut. 
                Format:
                #summary: [Masalah]
                #cause: [Akar Masalah]
                #solution: [Rekomendasi Solusi]
                Contoh Output: 
                #summary: Kegagalan berkala sistem kemudi tenaga listrik. 
                #cause: Sambungan longgar, penurunan tegangan di bawah beban, atau sensor torsi rusak. 
                #solution: Periksa rangkaian kabel di dekat kolom kemudi, uji baterai di bawah beban, dan jalankan pemindaian diagnostik untuk kode kesalahan. 
                Berikut adalah input-nya:\n";

            $productPrompt = 'Nama Produk: ' . $value->component_name;
            if (!empty($value->component_description)) {
                $productPrompt .= "\nDeskripsi Produk: " . $value->component_description;
            }
            if (!empty($value->vendor_name)) {
                $productPrompt .= "\nNama Vendor: " . $value->vendor_name;
                $productPrompt .= "\nPersentase Masalah: " . number_format($value->problem_percent, 2) . '% dari ' . $value->total_sent . ' barang';
            }
            $productPrompt .= "\nTemuan Masalah: " . $value->notes;

            $success = false;
            $attempt = 1;
            while (!$success) {
                $response = Http::withToken(
                    config('services.groq.key'),
                )
                    ->timeout(60)->post(config('services.groq.url'), [
                        'model' => config('services.groq.model'),
                        'messages' => [[
                            'role' => 'user',
                            'content' => $promptIdentity . $productPrompt,
                        ], ],
                    ]);

                if ($response->failed()) {
                    $attempt++;
                    if ($attempt > 3) {
                        throw new \Exception('Failed to connect: ' . $response->body());
                    }
                    sleep(60); // Wait for a minute before retrying
                } else {
                    $success = true;
                    $text = $response->json('choices.0.message.content');
                    $summary = Str::of($text)->after('#summary:')->before('#cause:')->trim();
                    $cause = Str::of($text)->after('#cause:')->before('#solution:')->trim();
                    $solution = Str::of($text)->after('#solution:')->trim();

                    \App\Models\ProductProblemAnalysis::updateOrCreate([
                        'component_name' => $value->component_name,
                        'date_range' => $value->date_range,
                    ], [
                        'summary' => $summary ?? 'N/A',
                        'cause' => $cause ?? 'N/A',
                        'solution' => $solution ?? 'N/A',
                    ]);
                }
            }
        }
        $end = microtime(true);
        logger()->info('Time:', ['time' => $end - $start]);
    }
}
