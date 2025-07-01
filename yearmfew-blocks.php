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

// wp-blocks'ı öncelikli olarak yükle
function yearmfew_blocks_ensure_wp_blocks() {
    wp_enqueue_script('wp-blocks');
}
add_action('wp_enqueue_scripts', 'yearmfew_blocks_ensure_wp_blocks', 5);
add_action('admin_enqueue_scripts', 'yearmfew_blocks_ensure_wp_blocks', 5);

// Editor assets
function yearmfew_blocks_enqueue_editor_assets() {
    wp_enqueue_script('wp-blocks'); // Tekrar yükle
    wp_enqueue_script('wp-components');
    wp_enqueue_script('wp-data');
    wp_enqueue_script('wp-element');
    wp_enqueue_script('wp-i18n');
    wp_enqueue_script('wp-core-data');
    wp_enqueue_script('wp-block-editor');
}
add_action('enqueue_block_editor_assets', 'yearmfew_blocks_enqueue_editor_assets', 10);

// Register blocks
function yearmfew_blocks_init()
{
    // Register all blocks automatically using block.json
    $blocks_dir = YEARMFEW_BLOCKS_PATH . 'blocks/';
    $blocks = array('hello-yearmfew', 'postonic', 'postonic-slider');

    foreach ($blocks as $block) {
        $block_path = $blocks_dir . $block;

        if (is_dir($block_path)) {
            $result = register_block_type($block_path);
            if ($result) {
                error_log("Yearmfew Blocks: Successfully registered block: " . $block);
            } else {
                error_log("Yearmfew Blocks: Failed to register block: " . $block);
            }
        } else {
            error_log("Yearmfew Blocks: Block directory not found: " . $block_path);
        }
    }
}

add_action('init', 'yearmfew_blocks_init');
