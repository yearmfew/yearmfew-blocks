import { registerBlockType } from '@wordpress/blocks';
import { PostonicEdit } from './components/PostonicEdit';
import { PostonicSave } from './components/PostonicSave';
import metadata from '../block.json';
// import './editor.scss';
import './style.scss';

registerBlockType(metadata.name, {
    ...metadata,
    edit: PostonicEdit,
    save: PostonicSave
});