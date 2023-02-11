import { SyntheticEvent, useEffect } from 'react';
import useBoolean from './useBoolean';

export const useImage = (
  src,
  onLoad,
  onError
) => {
  const { setTrue, setFalse, value } = useBoolean(!!src);

  useEffect(() => {
    if (!src) {
      setFalse();
    }
  }, [setFalse, src]);

  return {
    imageVisible: value,
    bindToImage: {
      hidden: !value,
      onLoad(e) {
        setTrue();
        onLoad && onLoad(e);
      },
      onError(e) {
        setTrue();
        onError && onError(e);
      },
      src,
    },
  };
};