import { useBlockProps, RichText } from '@wordpress/block-editor';

export const HelloYearmfewEdit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();
    const { title } = attributes;

    return (
        <div {...blockProps}>
            <RichText
                tagName="h2"
                value={title}
                onChange={(title) => setAttributes({ title })}
                placeholder="Başlık ekleyin..."
            />
        </div>
    );
};

export const HelloYearmfewSave = ({ attributes }) => {
    const blockProps = useBlockProps.save();
    const { title } = attributes;

    return (
        <div {...blockProps}>
            <RichText.Content
                tagName="h2"
                value={title}
            />
        </div>
    );
}; 