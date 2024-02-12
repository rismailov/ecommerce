<?php

/**
 * https://deployer.org/
 */

namespace Deployer;

require 'recipe/laravel.php';

// Config
set('repository', 'git@github.com:rismailov/ecommerce.git');
set('keep_releases', 3);

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);

// Hosts
host('__HOSTNAME__')
    ->set('remote_user', 'dev')
    ->set('deploy_path', '__PATH_TO_PROJECT__');

task('deploy', [
    'deploy:prepare',
    'deploy:vendors',
    'artisan:storage:link',
    'artisan:config:cache',
    'artisan:route:cache',
    'artisan:view:cache',
    'artisan:event:cache',
    'artisan:optimize:clear',
    // 'artisan:migrate',
    'deploy:publish',
]);

// Hooks
after('artisan:optimize:clear', 'build');
after('deploy:failed', 'deploy:unlock');
