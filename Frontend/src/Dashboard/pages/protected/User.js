import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../features/common/headerSlice';
import UserManagement from '../../features/user/UserManagement';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Users & Roles Management' }));
  }, [dispatch]);

  return <UserManagement />;
}

export default InternalPage;
