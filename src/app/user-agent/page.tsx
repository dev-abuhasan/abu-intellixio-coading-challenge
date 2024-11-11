import { UserAgent } from "@/views/userAgent";
import { headers } from 'next/headers';

const UserAgentRoot = () => {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || 'User agent not available';
  return <UserAgent userAgent={userAgent} />;
};

export default UserAgentRoot;
