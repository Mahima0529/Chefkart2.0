import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../features/common/headerSlice';
import BookingManagement from '../../features/booking/BookingManagement';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Booking Management' }));
  }, [dispatch]);

  return <BookingManagement />;
}

export default InternalPage;
