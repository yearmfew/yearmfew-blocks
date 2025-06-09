import { registerBlockType } from '@wordpress/blocks';
import { HelloYearmfewEdit, HelloYearmfewSave } from './components/HelloYearmfew';

registerBlockType('yearmfew-blocks/hello-yearmfew', {
    edit: HelloYearmfewEdit,
    save: HelloYearmfewSave,
    attributes: {
        title: {
            type: 'string',
            default: ''
        }
    }
}); 