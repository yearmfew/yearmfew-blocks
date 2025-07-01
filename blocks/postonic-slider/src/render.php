<?php
/**
 * Server-side rendering of the Postonic Slider block
 */
if (!defined('ABSPATH')) {
    exit;
}
$category = isset($attributes['category']) ? $attributes['category'] : '';
$posts_to_show = !empty($attributes['postsToShow']) ? intval($attributes['postsToShow']) : 6;
$post_count = !empty($attributes['postCount']) ? intval($attributes['postCount']) : 0;
$show_title = isset($attributes['showTitle']) ? $attributes['showTitle'] : true;
$show_image = isset($attributes['showImage']) ? $attributes['showImage'] : true;
$show_content = isset($attributes['showContent']) ? $attributes['showContent'] : true;
$show_author = isset($attributes['showAuthor']) ? $attributes['showAuthor'] : true;
$show_date = isset($attributes['showDate']) ? $attributes['showDate'] : true;
$show_share = isset($attributes['showShare']) ? $attributes['showShare'] : true;
$posts_per_page = $post_count > 0 ? $post_count : $posts_to_show;
$show_pagination = isset($attributes['showPagination']) ? $attributes['showPagination'] : true;
$show_navigation = isset($attributes['showNavigation']) ? $attributes['showNavigation'] : true;

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
$slider_id = 'postonic-slider-' . uniqid();
?>
<div <?php echo get_block_wrapper_attributes([
    'class' => 'wp-block-yearmfew-blocks-postonic-slider',
    'data-show-pagination' => !empty($attributes['showPagination']) ? 'true' : 'false',
    'data-show-navigation' => !empty($attributes['showNavigation']) ? 'true' : 'false',
]); ?>>
    <div class="postonic-slider">
        <?php if ($query->have_posts()) : ?>
            <div class="swiper postonic-slider-swiper" id="<?php echo esc_attr($slider_id); ?>">
                <div class="swiper-wrapper">
                    <?php while ($query->have_posts()) : $query->the_post(); ?>
                        <div class="swiper-slide">
                            <div class="postonic-slider-item">
                                <?php if ($show_image && has_post_thumbnail()) : ?>
                                    <div class="postonic-slider-image">
                                        <?php 
                                            the_post_thumbnail('medium'); 
                                        ?></div>
                                <?php endif; ?>
                                <?php if ($show_title) : ?>
                                    <h3 class="postonic-slider-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                                <?php endif; ?>
                                <?php if ($show_content) : ?>
                                    <div class="postonic-slider-content"><?php the_excerpt(); ?></div>
                                <?php endif; ?>
                                <?php if ($show_author || $show_date) : ?>
                                    <div class="postonic-slider-meta">
                                        <?php if ($show_author) : ?>
                                            <span class="postonic-slider-author"><?php the_author(); ?></span>
                                        <?php endif; ?>
                                        <?php if ($show_date) : ?>
                                            <span class="postonic-slider-date"><?php the_time(get_option('date_format')); ?></span>
                                        <?php endif; ?>
                                    </div>
                                <?php endif; ?>
                                <?php if ($show_share) : ?>
                                    <div class="postonic-slider-share">[Share buttons here]</div>
                                <?php endif; ?>
                            </div>
                        </div>
                    <?php endwhile; ?>
                </div>
                <?php if ($show_pagination) : ?>
                    <div class="swiper-pagination" id="<?php echo esc_attr($slider_id); ?>-pagination"></div>
                <?php endif; ?>
                <?php if ($show_navigation) : ?>
                <div class="swiper-button-prev" id="<?php echo esc_attr($slider_id); ?>-prev"></div>
                <div class="swiper-button-next" id="<?php echo esc_attr($slider_id); ?>-next"></div>
                <?php endif; ?>
            </div>
        <?php else : ?>
            <p><?php _e('No posts found.', 'yearmfew-blocks'); ?></p>
        <?php endif; ?>
        <?php wp_reset_postdata(); ?>
    </div>
</div>
