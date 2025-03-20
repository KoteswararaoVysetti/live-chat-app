'use client';
import { useState } from 'react';
import { LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn, getInitialLetter } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ThemeSwitch from '@/components/common/theme-switch';
import LogoutAlert from './logout-alert';

type AvatarProps = {
  firstName: string;
  lastName: string;
};

export default function UserSettings({ firstName, lastName }: AvatarProps) {
  const [openLogOutAlert, setOpenLogoutAlert] = useState<boolean>(false);

  const onLogoutCancel = () => {
    setOpenLogoutAlert(false);
  };

  const onLogout = () => {
    // LogoutAction();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarFallback className={cn('cursor-pointer')}>
              {getInitialLetter(firstName) + getInitialLetter(lastName)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="flex items-center gap-2">
              {firstName} {lastName}
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center gap-2 justify-end cursor-pointer">
            Theme
            <DropdownMenuShortcut>
              <ThemeSwitch />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpenLogoutAlert(true)}
            className="flex items-center gap-2 justify-end cursor-pointer"
          >
            Logout
            <DropdownMenuShortcut>
              <LogOut size={14} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutAlert
        open={openLogOutAlert}
        onCancel={onLogoutCancel}
        onSubmit={onLogout}
      />
    </>
  );
}
