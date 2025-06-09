<?php

/**
 * Plugin Name: Yearmfew Blocks
 * Description: Custom Gutenberg blocks
 * Version: 1.0.0
 * Author: Yearmfew
 */

if (!defined('ABSPATH')) {
    exit;
}

define('YEARMFEW_BLOCKS_VERSION', '1.0.0');
define('YEARMFEW_BLOCKS_PATH', plugin_dir_path(__FILE__));
define('YEARMFEW_BLOCKS_URL', plugin_dir_url(__FILE__));

// Register custom block category
function yearmfew_blocks_categories($categories)
{
    return array_merge(
        [
            [
                'slug' => 'yearmfew-blocks',
                'title' => __('Yearmfew Blocks', 'yearmfew-blocks'),
                'icon' => 'smiley'
            ]
        ],
        $categories
    );
}
add_filter('block_categories_all', 'yearmfew_blocks_categories');

// Register blocks
function yearmfew_blocks_init()
{


    // Postonic block
    register_block_type(
        YEARMFEW_BLOCKS_PATH . 'blocks/postonic',
        [
            'render_callback' => function ($attributes, $content) {
                ob_start();
                include YEARMFEW_BLOCKS_PATH . 'blocks/postonic/src/render.php';
                return ob_get_clean();
            }
        ]
    );

    // Hello Yearmfew block
    register_block_type(YEARMFEW_BLOCKS_PATH . 'blocks/hello-yearmfew');
}

add_action('init', 'yearmfew_blocks_init');
