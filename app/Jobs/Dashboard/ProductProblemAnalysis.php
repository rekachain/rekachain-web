<?php

namespace App\Jobs\Dashboard;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

class ProductProblemAnalysis implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(protected array $data) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $start = microtime(true);
        // logger()->info('Transformed:', ['transformed' => $this->data]);
        foreach ($this->data as $value) {
            $promptIdentity = "Jawab dengan bahasa Indonesia!.
                Anda adalah asisten diagnostik kendaraan kereta api. 
                Tugas Anda: Mengidentifikasi akar penyebab masalah dan merekomendasikan solusi. 
                Contoh Output: 
                - Masalah: Kegagalan berkala sistem kemudi tenaga listrik. 
                - Kemungkinan Penyebab: Sambungan longgar, penurunan tegangan di bawah beban, atau sensor torsi rusak. 
                - Solusi yang Direkomendasikan: Periksa rangkaian kabel di dekat kolom kemudi, uji baterai di bawah beban, dan jalankan pemindaian diagnostik untuk kode kesalahan. 
                Berikut adalah inputnya:\n";
            $productPrompt = "Nama Produk: " . $value->component_name . 
                "\nNama Vendor: " . $value->vendor_name . 
                "\nPersentase Masalah: " . number_format($value->problem_percent, 2) . "% dari " . $value->total_sent . " barang" .
                "\nTemuan Masalah: " . $value->notes;
            logger()->info('Prompt:', ['prompt' => $promptIdentity . $productPrompt]);
        }
        $response = Http::withBasicAuth(
                config('app.ollama_username'),
                config('app.ollama_password')
            )
            ->post(config('app.ollama_api_url'), [
                'model' => 'mistral',
                'prompt' => 'Hello World!',
                'stream' => false,
            ]);

        if ($response->failed()) {
            throw new \Exception('Failed to connect to Ollama: ' . $response->body());
        }
        $end = microtime(true);
        logger()->info('LLM Summary:', ['summary' => $response->body()]);
        logger()->info('Time:', ['time' => $end - $start]);

        // return $response->json();
    }
}
