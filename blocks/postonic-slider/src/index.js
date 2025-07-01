import { registerBlockType } from '@wordpress/blocks';
import { PostonicSliderEdit } from './components/PostonicSliderEdit';
import metadata from '../block.json';
import './style.scss';
import './editor.scss';

registerBlockType(metadata.name, {
    ...metadata,
    edit: PostonicSliderEdit,
    save: () => null
});
