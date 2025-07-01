import { registerBlockType } from '@wordpress/blocks';
import { HelloYearmfewEdit, HelloYearmfewSave } from './components/HelloYearmfew';
import metadata from '../block.json';
import './style.scss';

registerBlockType(metadata.name, {
    ...metadata,
    edit: HelloYearmfewEdit,
    save: HelloYearmfewSave
}); 