import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl, Placeholder, Spinner, TextControl, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';
import { RawHTML } from '@wordpress/element';

export const PostonicEdit = ({ attributes, setAttributes }) => {
    const {
        category,
        postsToShow,
        postCount,
        showTitle,
        showImage,
        showContent,
        showAuthor,
        showDate,
        showShare
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

        // Create a temporary div
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Get the text
        let text = tempDiv.textContent || tempDiv.innerText || '';

        // If longer than 150 characters, shorten
        if (text.length > 150) {
            // Preserve HTML structure
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
                <PanelBody title="Block Settings">
                    <RangeControl
                        label="Number of Posts"
                        value={postsToShow}
                        onChange={(value) => setAttributes({ postsToShow: value })}
                        min={1}
                        max={12}
                        __next40pxDefaultSize={true}
                        __nextHasNoMarginBottom={true}
                    />
                    <ToggleControl
                        label="Show Title"
                        checked={showTitle}
                        onChange={(value) => setAttributes({ showTitle: value })}
                        __nextHasNoMarginBottom={true}
                    />
                    <ToggleControl
                        label="Show Featured Image"
                        checked={showImage}
                        onChange={(value) => setAttributes({ showImage: value })}
                        __nextHasNoMarginBottom={true}
                    />
                    <ToggleControl
                        label="Show Content"
                        checked={showContent}
                        onChange={(value) => setAttributes({ showContent: value })}
                        __nextHasNoMarginBottom={true}
                    />
                    <ToggleControl
                        label="Show Author"
                        checked={showAuthor}
                        onChange={(value) => setAttributes({ showAuthor: value })}
                        __nextHasNoMarginBottom={true}
                    />
                    <ToggleControl
                        label="Show Date"
                        checked={showDate}
                        onChange={(value) => setAttributes({ showDate: value })}
                        __nextHasNoMarginBottom={true}
                    />
                    <ToggleControl
                        label="Show Share Button"
                        checked={showShare}
                        onChange={(value) => setAttributes({ showShare: value })}
                        __nextHasNoMarginBottom={true}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="postonic-category-selector">
                    <div className="postonic-controls">
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
                                onChange={(value) => setAttributes({ category: value })}
                                __next40pxDefaultSize={true}
                                __nextHasNoMarginBottom={true}
                            />
                            <TextControl
                                type="number"
                                label="Post Count"
                                value={postCount || ''}
                                onChange={(value) => setAttributes({ postCount: value })}
                                min={1}
                                max={20}
                                help="Number of posts to display"
                                __next40pxDefaultSize={true}
                                __nextHasNoMarginBottom={true}
                            />
                        </div>
                        <div className="post-controls">
                            <ToggleControl
                                label="Show Title"
                                checked={showTitle}
                                onChange={(value) => setAttributes({ showTitle: value })}
                                __nextHasNoMarginBottom={true}
                            />
                            <ToggleControl
                                label="Show Featured Image"
                                checked={showImage}
                                onChange={(value) => setAttributes({ showImage: value })}
                                __nextHasNoMarginBottom={true}
                            />
                            <ToggleControl
                                label="Show Content"
                                checked={showContent}
                                onChange={(value) => setAttributes({ showContent: value })}
                                __nextHasNoMarginBottom={true}
                            />
                            <ToggleControl
                                label="Show Author"
                                checked={showAuthor}
                                onChange={(value) => setAttributes({ showAuthor: value })}
                                __nextHasNoMarginBottom={true}
                            />
                            <ToggleControl
                                label="Show Date"
                                checked={showDate}
                                onChange={(value) => setAttributes({ showDate: value })}
                                __nextHasNoMarginBottom={true}
                            />
                            <ToggleControl
                                label="Show Share Button"
                                checked={showShare}
                                onChange={(value) => setAttributes({ showShare: value })}
                                __nextHasNoMarginBottom={true}
                            />
                        </div>
                    </div>
                </div>

                <div className="postonic-grid">
                    {posts && posts.map((post) => {
                        const media = featuredMedia[post.featured_media];

                        return (
                            <article key={post.id} className="postonic-item">
                                {showImage && media && (
                                    <a href={post.link} className="postonic-thumbnail">
                                        <img
                                            src={media.source_url}
                                            alt={post.title.rendered}
                                        />
                                    </a>
                                )}
                                {showTitle && (
                                    <h3 className="postonic-title">
                                        <a href={post.link}>
                                            {post.title.rendered}
                                        </a>
                                    </h3>
                                )}
                                <div className="postonic-excerpt">
                                    {showContent && (
                                        <RawHTML>
                                            {truncateExcerpt(post.excerpt.rendered)}
                                        </RawHTML>
                                    )}
                                </div>
                                <div className="postonic-meta">
                                    {showAuthor && (
                                        <span className="postonic-author">
                                            {post.author}
                                        </span>
                                    )}
                                    {showDate && (
                                        <span className="postonic-date">
                                            {post.date}
                                        </span>
                                    )}
                                    {showShare && (
                                        <button className="postonic-share">
                                            {__('Paylaş', 'yearmfew-blocks')}
                                        </button>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div >
        </>
    );
};