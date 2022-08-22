import { useEffect } from 'react';
import useIntersection from '@hooks/useIntersection';

const Loader = () => <>Loading...</>;

const InfiniteFeedRow = ({
  data = [],
  isLoading = true,
  renderLoader = Loader,
  onLoadMore,
  renderItem
}) => {
  const { intersecting, ref } = useIntersection();

  useEffect(() => {
    if (intersecting && !isLoading) {
      onLoadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersecting, isLoading]);

  const renderItems = () => data.map((item, index) => renderItem(item, index));

  return (
    <>
      {renderItems()}
      <>
        {true && <div style={{ width: '100%', height: '12px' }} ref={ref} />}
        {isLoading && renderLoader()}
      </>
    </>
  );
};

export default InfiniteFeedRow;
