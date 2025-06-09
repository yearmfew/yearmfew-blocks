import { useBlockProps, RichText } from '@wordpress/block-editor';

export const HelloYearmfewEdit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();
    const { title, subtitle } = attributes;

    return (
        <div {...blockProps}>
            <RichText
                tagName="h1"
                value={title}
                onChange={(title) => setAttributes({ title })}
                placeholder="Add a title here"
            />
            <RichText
                tagName="span"
                value={subtitle}
                onChange={(subtitle) => setAttributes({ subtitle })}
                placeholder="Add a subtitle here..."
            />
        </div>
    );
};

export const HelloYearmfewSave = ({ attributes }) => {
    const blockProps = useBlockProps.save();
    const { title, subtitle } = attributes;

    return (
        <div {...blockProps}>
            <RichText.Content
                tagName="h1"
                value={title}
            />
            <RichText.Content
                tagName="span"
                value={subtitle}
            />
        </div>
    );
};