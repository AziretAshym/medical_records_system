import { FC, PropsWithChildren } from 'react'
import { useAppSelector } from '@/app/hooks.ts'
import { selectUser } from '@/app/slices/usersSlice.ts';
import { featureProtection } from '../../../constants.ts';

interface Props extends PropsWithChildren {
  allowedRoles: string[]
}

const ProtectedElement: FC<Props> = ({ allowedRoles, children }) => {
  const user = useAppSelector(selectUser)

  if (
    featureProtection &&
    (!user?.role || !allowedRoles.includes(user.role.toLowerCase()))
  ) {
    return null;
  }

  return <>{children}</>
}

export default ProtectedElement