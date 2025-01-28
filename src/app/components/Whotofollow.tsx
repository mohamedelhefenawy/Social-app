import { getRandomUsers } from '@/src/actions/user.action'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import Link from 'next/link'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import FollowButton from './FollowButton'

export default async function Whotofollow() {
    const randomUsers = await getRandomUsers()

    if (!randomUsers.length) return null

    return (
        <Card>
      <CardHeader>
        <CardTitle>Who to Follow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {randomUsers.map((user) => (
            <div key={user.id} className="flex gap-2 items-center justify-between ">
              <div className="flex items-center gap-1">
                <Link href={`/profile/${user.username}`}>
                  <Avatar>
                    <AvatarImage src={user.image ?? "../../public/avatar.png"} className='rounded-full w-12 h-12 mr-5' />
                  </Avatar>
                </Link>
                <div className="text-xs">
                  <Link href={`/profile/${user.username}`} className="font-medium cursor-pointer text-xl hover:underline transition duration-500">
                    {user.name}
                  </Link>
                  <p className="text-muted-foreground">@{user.username}</p>
                  <p className="text-muted-foreground">{user._count.followers} followers</p>
                </div>
              </div>
              <FollowButton userId={user.id} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    )
}
