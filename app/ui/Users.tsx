import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchUsers } from '@/app/lib/data';
import {Button} from '@/app/ui/button';
import Link from 'next/link';

export default async function Users() {
  const users = await fetchUsers();
  console.log(users);

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Users
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {users.map((user, i) => {
            return (
              <div
                key={user.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-gray-500 text-sm font-semibold md:text-base">
                      {user.name} 
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {user.email}
                    </p>
                  </div>
                </div>
	      <Link href={{ pathname: 'chat', query:{id: `${user.id}`}}}>
		<Button>Chat Using This Account</Button>
		</Link>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
