const NavBarSkeleton = () => {
  return (
    <>
      <div className="bg-white h-6 w-full" />
      <div className="animate-pulse flex justify-between items-center px-4 py-4 bg-gray-200 h-68 lg:h-[100px]">
        {/* Logo Skeleton */}
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700"></div>
          <div className="flex flex-col space-y-2">
            <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
        {/* Nav Items Skeleton */}
        <div className="hidden md:flex space-x-8">
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        {/* Mobile Menu Icon Skeleton */}
        <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full md:hidden"></div>
      </div>
    </>
  );
};

export default NavBarSkeleton;
