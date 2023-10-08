<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSomeFieldOauthClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $schema = Schema::connection($this->getConnection());

        $schema->table('oauth_clients', function (Blueprint $table) {
            $table->string('app_link')->after('name');
            $table->string('app_logo')->after('name');
            $table->string('description')->nullable()->after('name');
            $table->string('back_link')->nullable()->after('name');
            $table->string('rick_text')->nullable()->after('name');
            $table->string('doc_link')->nullable()->after('name');
            $table->text('description_image')->nullable()->after('name');
            $table->string('youtube_link')->nullable()->after('name');
            $table->enum('status', ['rejected','approved','pending','deactivated'])
                ->default('pending')->after('name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
