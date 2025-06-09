import { useBlockProps } from '@wordpress/block-editor';

export const PostonicSave = () => {
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            {/* İçerik render.php tarafından oluşturulacak */}
        </div>
    );
}; 