import UserSettings from './user-settings';
import { getUserDetails } from '@/app/action';

export const Header = async ({ className }: { className: string }) => {
  const userData = await getUserDetails();
  if (!userData) {
    return;
  }
  return (
    <header
      className={`flex flex-row-reverse px-4 justify-between items-center shadow-md ${className}`}
    >
      <div className={`w-full flex flex-row items-center`}>
        <div className="flex flex-row items-center gap-x-4">
          <UserSettings firstName={userData.name} lastName={''} />
        </div>
      </div>
    </header>
  );
};
