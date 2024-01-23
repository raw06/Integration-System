<?php

namespace App\Console\Commands;

use App\Models\Client;
use Illuminate\Console\Command;

class AssignTypeClient extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'assign:client {--name=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'assign client to show on marketplace';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     */
    public function handle()
    {
       $this->line("Starting assign...");
       $clientName = $this->option('name');

       /** @var Client $client */
       $client = Client::query()->where('name', $clientName)->first();

       try {
           $client->update(['type' => 1]);
           $this->line("Done");
       } catch (\Exception $exception) {
           $this->line("Failed to assign type client ${exception}");
       }
    }
}
