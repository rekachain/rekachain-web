import { registerPlugin } from 'react-filepond';

import 'filepond/dist/filepond.min.css';

import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFilePoster,
);
