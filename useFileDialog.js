import { useState } from 'react';

const DEFAULT_OPTIONS = {
	multiple: true,
	accept: '*',
};

const useFileDialog = (
	onSelectFile,
	options
) => {
	const [files, setFiles] = useState(null);

	const openFileDialog = (localOptions) => {
		const _options = {
			...DEFAULT_OPTIONS,
			...options,
			...localOptions,
		};
		const input = document.createElement('input');
		input.type = 'file';
		input.multiple = _options.multiple;
		input.accept = _options.accept;

		input.onchange = (event) => {
			const {
				files,
			} = event.target;
			setFiles(files);
			if (onSelectFile) {
				onSelectFile(files);
			}
		};

		input.click();
	};

	return { files, openFileDialog };
};

export default useFileDialog;