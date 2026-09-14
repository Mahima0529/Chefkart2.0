import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon';
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon';
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon';
import UsersIcon from '@heroicons/react/24/outline/UsersIcon';
import SparklesIcon from '@heroicons/react/24/outline/SparklesIcon';
import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon';
import ChatBubbleLeftRightIcon from '@heroicons/react/24/outline/ChatBubbleLeftRightIcon';
import PhotoIcon from '@heroicons/react/24/outline/PhotoIcon';
import ViewColumnsIcon from '@heroicons/react/24/outline/ViewColumnsIcon';
import FilmIcon from '@heroicons/react/24/outline/FilmIcon';
import UserPlusIcon from '@heroicons/react/24/outline/UserPlusIcon';
import BanknotesIcon from '@heroicons/react/24/outline/BanknotesIcon';

const iconClasses = 'h-5 w-5';

const routes = [
  {
    path: '/dashboard',
    icon: <Squares2X2Icon className={iconClasses} />,
    name: 'Dashboard',
  },
  {
    path: '/dashboard/booking',
    icon: <CalendarDaysIcon className={iconClasses} />,
    name: 'Bookings',
  },
  {
    path: '/dashboard/Chef',
    icon: <UserGroupIcon className={iconClasses} />,
    name: 'Chefs',
  },
  {
    path: '/dashboard/User',
    icon: <UsersIcon className={iconClasses} />,
    name: 'Users & Roles',
  },
  {
    path: '/dashboard/Service',
    icon: <SparklesIcon className={iconClasses} />,
    name: 'Services',
  },
  {
    path: '/dashboard/Home',
    icon: <HomeIcon className={iconClasses} />,
    name: 'Home Management',
  },
  {
    path: '/dashboard/Blog',
    icon: <DocumentTextIcon className={iconClasses} />,
    name: 'Blogs',
  },
  {
    path: '/dashboard/testimonial',
    icon: <ChatBubbleLeftRightIcon className={iconClasses} />,
    name: 'Testimonials',
  },
  {
    path: '/dashboard/Gallery',
    icon: <PhotoIcon className={iconClasses} />,
    name: 'Gallery',
  },
  {
    path: '/dashboard/ImageGallery',
    icon: <ViewColumnsIcon className={iconClasses} />,
    name: 'Food Gallery',
  },
  {
    path: '/dashboard/crousel',
    icon: <FilmIcon className={iconClasses} />,
    name: 'Carousel Banners',
  },
  {
    path: '/dashboard/joinChef',
    icon: <UserPlusIcon className={iconClasses} />,
    name: 'Join Inquiries',
  },
  {
    path: '/dashboard/investor',
    icon: <BanknotesIcon className={iconClasses} />,
    name: 'Investors',
  },
];

export default routes;
