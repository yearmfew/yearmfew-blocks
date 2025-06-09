<?php

/**
 * Server-side rendering of the Postonic block
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}
// Get block attributes
$category = isset($attributes['category']) ? $attributes['category'] : '';
$posts_to_show = !empty($attributes['postsToShow']) ? intval($attributes['postsToShow']) : 6;
$post_count = !empty($attributes['postCount']) ? intval($attributes['postCount']) : 0;
$show_title = isset($attributes['showTitle']) ? $attributes['showTitle'] : true;
$show_image = isset($attributes['showImage']) ? $attributes['showImage'] : true;
$show_content = isset($attributes['showContent']) ? $attributes['showContent'] : true;
$show_author = isset($attributes['showAuthor']) ? $attributes['showAuthor'] : true;
$show_date = isset($attributes['showDate']) ? $attributes['showDate'] : true;
$show_share = isset($attributes['showShare']) ? $attributes['showShare'] : true;

// posts_per_page için güvenli değer
$posts_per_page = $post_count > 0 ? $post_count : $posts_to_show;

$args = array(
    'post_type' => 'post',
    'post_status' => 'publish',
    'posts_per_page' => $posts_per_page,
    'ignore_sticky_posts' => true,
);
if (!empty($category)) {
    $args['cat'] = intval($category);
}
$query = new WP_Query($args);
?>


<div <?php echo get_block_wrapper_attributes(['class' => 'wp-block-yearmfew-blocks-postonic']); ?>>
    <div class="postonic-category-selector">

    </div>
    <?php if ($query->have_posts()) : ?>
        <div class="postonic-grid">
            <?php while ($query->have_posts()) : $query->the_post(); ?>
                <article class="postonic-item">
                    <?php if ($show_image && has_post_thumbnail()) : ?>
                        <a href="<?php echo esc_url(get_permalink()); ?>" class="postonic-thumbnail">
                            <?php the_post_thumbnail('medium', ['class' => 'postonic-image']); ?>
                        </a>
                    <?php endif; ?>
                    <?php if ($show_title) : ?>
                        <h3 class="postonic-title">
                            <a href="<?php echo esc_url(get_permalink()); ?>">
                                <?php echo esc_html(get_the_title()); ?>
                            </a>
                        </h3>
                    <?php endif; ?>
                    <?php if ($show_content) : ?>
                        <div class="postonic-excerpt">
                            <?php
                            $excerpt = get_the_excerpt();
                            if (strlen($excerpt) > 150) {
                                $excerpt = substr($excerpt, 0, 150) . '...';
                            }
                            echo wp_kses_post($excerpt);
                            ?>
                        </div>
                    <?php endif; ?>
                    <div class="postonic-meta">
                        <?php if ($show_author) : ?>
                            <span class="postonic-author">
                                <?php echo esc_html(get_the_author()); ?>
                            </span>
                        <?php endif; ?>
                        <?php if ($show_date) : ?>
                            <span class="postonic-date">
                                <?php echo esc_html(get_the_date()); ?>
                            </span>
                        <?php endif; ?>
                        <?php if ($show_share) : ?>
                            <button class="postonic-share">
                                <?php esc_html_e('Paylaş', 'yearmfew-blocks'); ?>
                            </button>
                        <?php endif; ?>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>
    <?php else : ?>
        <p class="postonic-no-posts">
            <?php esc_html_e('No posts found.', 'yearmfew-blocks'); ?>
        </p>
    <?php endif; ?>
</div>
<?php
wp_reset_postdata();
