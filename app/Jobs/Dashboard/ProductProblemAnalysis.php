<?php

namespace App\Jobs\Dashboard;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class ProductProblemAnalysis implements ShouldQueue {
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(protected array $data) {}

    /**
     * Execute the job.
     */
    public function handle(): void {
        $start = microtime(true);
        foreach ($this->data as $value) {
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
            $productPrompt = 'Nama Produk: ' . $value->component_name .
                "\nNama Vendor: " . $value->vendor_name .
                "\nPersentase Masalah: " . number_format($value->problem_percent, 2) . '% dari ' . $value->total_sent . ' barang' .
                "\nTemuan Masalah: " . $value->notes;
            // logger()->info('Prompt:', ['prompt' => $promptIdentity . $productPrompt]);
            $response = Http::withBasicAuth(
                config('app.ollama_username'),
                config('app.ollama_password')
            )
                ->timeout(60)->post(config('app.ollama_api_url'), [
                'model' => 'mistral',
                'prompt' => $promptIdentity . $productPrompt,
                'stream' => false,
            ]);

            if ($response->failed()) {
                throw new \Exception('Failed to connect to Ollama: ' . $response->body());
            }

            $text = $response->json('response');
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
        $end = microtime(true);
        logger()->info('Time:', ['time' => $end - $start]);
    }
}
