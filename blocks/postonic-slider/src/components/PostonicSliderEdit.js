import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl, Placeholder, Spinner, TextControl, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';
import { RawHTML } from '@wordpress/element';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export const PostonicSliderEdit = ({ attributes, setAttributes }) => {
    const {
        category,
        postsToShow,
        postCount,
        showTitle,
        showImage,
        showContent,
        showAuthor,
        showDate,
        showShare,
        showPagination,
        showNavigation
    } = attributes;
    const blockProps = useBlockProps();

    // Get categories
    const categories = useSelect((select) => {
        return select(coreStore).getEntityRecords('taxonomy', 'category', {
            per_page: -1,
            _fields: 'id,name,slug,count',
            hide_empty: true
        });
    }, []);

    // Get posts for preview
    const posts = useSelect((select) => {
        const query = {
            per_page: postCount || postsToShow,
            _fields: 'id,title,excerpt,featured_media,link,author,date',
            status: 'publish',
            ...(category && { categories: category })
        };

        return select(coreStore).getEntityRecords('postType', 'post', query);
    }, [category, postsToShow, postCount]);

    // Get featured media
    const featuredMedia = useSelect((select) => {
        if (!posts) return {};
        const mediaIds = posts
            .filter(post => post.featured_media)
            .map(post => post.featured_media);
        if (!mediaIds.length) return {};
        const media = select(coreStore).getEntityRecords('postType', 'attachment', {
            include: mediaIds,
            _fields: 'id,source_url,media_details'
        });
        const mediaMap = {};
        if (media) {
            media.forEach(item => {
                mediaMap[item.id] = item;
            });
        }
        return mediaMap;
    }, [posts]);

    // Shorten the text but preserve HTML formatting
    const truncateExcerpt = (html) => {
        if (!html) return '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        let text = tempDiv.textContent || tempDiv.innerText || '';
        if (text.length > 150) {
            const truncatedText = text.substring(0, 150) + '...';
            tempDiv.textContent = truncatedText;
            return tempDiv.innerHTML;
        }
        return html;
    };

    if (!categories) {
        return (
            <div {...blockProps}>
                <Placeholder>
                    <Spinner />
                </Placeholder>
            </div>
        );
    }

    return (
        <>
            <InspectorControls>
                <PanelBody title="Slider Block Settings">
                    <RangeControl
                        label="Number of Posts"
                        value={postsToShow}
                        onChange={updatePostsToShow}
                        min={1}
                        max={12}
                        __next40pxDefaultSize={true}
                        __nextHasNoMarginBottom={true}
                    />
                    <ToggleControl
                        label="Show Title"
                        checked={!!showTitle}
                        onChange={updateShowTitle}
                        __nextHasNoMarginBottom={true}
                    />
                    <ToggleControl
                        label="Show Featured Image"
                        checked={!!showImage}
                        onChange={updateShowImage}
                        __nextHasNoMarginBottom={true}
                    />
                    <ToggleControl
                        label="Show Content"
                        checked={!!showContent}
                        onChange={updateShowContent}
                        __nextHasNoMarginBottom={true}
                    />
                    <ToggleControl
                        label="Show Author"
                        checked={!!showAuthor}
                        onChange={updateShowAuthor}
                        __nextHasNoMarginBottom={true}
                    />
                    <ToggleControl
                        label="Show Date"
                        checked={!!showDate}
                        onChange={updateShowDate}
                        __nextHasNoMarginBottom={true}
                    />
                    <ToggleControl
                        label="Show Share Button"
                        checked={!!showShare}
                        onChange={updateShowShare}
                        __nextHasNoMarginBottom={true}
                    />
                    <ToggleControl
                        label="Show Pagination"
                        checked={!!showPagination}
                        onChange={updateShowPagination}
                        __nextHasNoMarginBottom={true}
                    />
                    <ToggleControl
                        label="Show Navigation Arrows"
                        checked={!!showNavigation}
                        onChange={updateShowNavigation}
                        __nextHasNoMarginBottom={true}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="postonic-slider-category-selector">
                    <div className="postonic-slider-controls">
                        <div className="general-controls">
                            <SelectControl
                                label="Select Category"
                                value={category}
                                options={[
                                    { label: 'All Categories', value: '' },
                                    ...(categories || []).map((cat) => ({
                                        label: `${cat.name} (${cat.count})`,
                                        value: cat.id.toString()
                                    }))
                                ]}
                                onChange={updateCategory}
                                __next40pxDefaultSize={true}
                                __nextHasNoMarginBottom={true}
                            />
                            <TextControl
                                type="number"
                                label="Post Count"
                                value={postCount || ''}
                                onChange={updatePostCount}
                                min={1}
                                max={20}
                                __next40pxDefaultSize={true}
                                __nextHasNoMarginBottom={true}
                            />
                        </div>
                        <div className="post-controls">
                            <ToggleControl
                                label="Show Title"
                                checked={!!showTitle}
                                onChange={updateShowTitle}
                                __nextHasNoMarginBottom={true}
                            />
                            <ToggleControl
                                label="Show Featured Image"
                                checked={!!showImage}
                                onChange={updateShowImage}
                                __nextHasNoMarginBottom={true}
                            />
                            <ToggleControl
                                label="Show Content"
                                checked={!!showContent}
                                onChange={updateShowContent}
                                __nextHasNoMarginBottom={true}
                            />
                            <ToggleControl
                                label="Show Author"
                                checked={!!showAuthor}
                                onChange={updateShowAuthor}
                                __nextHasNoMarginBottom={true}
                            />
                            <ToggleControl
                                label="Show Date"
                                checked={!!showDate}
                                onChange={updateShowDate}
                                __nextHasNoMarginBottom={true}
                            />
                            <ToggleControl
                                label="Show Share Button"
                                checked={!!showShare}
                                onChange={updateShowShare}
                                __nextHasNoMarginBottom={true}
                            />
                            <ToggleControl
                                label="Show Pagination"
                                checked={!!showPagination}
                                onChange={updateShowPagination}
                                __nextHasNoMarginBottom={true}
                            />
                            <ToggleControl
                                label="Show Navigation Arrows"
                                checked={!!showNavigation}
                                onChange={updateShowNavigation}
                                __nextHasNoMarginBottom={true}
                            />
                        </div>
                    </div>
                </div>

                <div className="postonic-slider-preview">
                    <div className="postonic-slider-items-preview">
                        {posts && Array.isArray(posts) && posts.map((post) => {
                            if (!post || !post.id) return null;
                            const media = featuredMedia[post.featured_media];
                            return (
                                <div key={post.id} className="postonic-slider-item-preview">
                                    {showImage && media && (
                                        <div className="postonic-slider-thumbnail">
                                            <img
                                                src={media.source_url}
                                                alt={post.title?.rendered || ''}
                                            />
                                        </div>
                                    )}
                                    {showTitle && (
                                        <h3 className="postonic-slider-title">
                                            {post.title?.rendered || 'No title'}
                                        </h3>
                                    )}
                                    <div className="postonic-slider-excerpt">
                                        {showContent && post.excerpt?.rendered && (
                                            <RawHTML>
                                                {truncateExcerpt(post.excerpt.rendered)}
                                            </RawHTML>
                                        )}
                                    </div>
                                    <div className="postonic-slider-meta">
                                        {showAuthor && (
                                            <span className="postonic-slider-author">
                                                Author: {post.author || 'Unknown'}
                                            </span>
                                        )}
                                        {showDate && (
                                            <span className="postonic-slider-date">
                                                {post.date || 'No date'}
                                            </span>
                                        )}
                                        {showShare && (
                                            <button className="postonic-slider-share">
                                                {__('Paylaş', 'yearmfew-blocks')}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div >
        </>
    );
};
