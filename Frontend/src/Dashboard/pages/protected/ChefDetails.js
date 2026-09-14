import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../features/common/headerSlice';
import ChefManagement from '../../features/chef/ChefManagement';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Chef Management' }));
  }, [dispatch]);

  return <ChefManagement />;
}

export default InternalPage;