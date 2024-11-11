"use client";
import { BackToHome } from "@/components/backToHome/backToHome";
interface Props {
  userAgent: string;
}

export const UserAgent = ({ userAgent }: Props) => {

  return (
    <div>
      <BackToHome />

      {userAgent && (
        <div className="flex font-mono font-semibold text-sm">
          <div className="border p-2">UserAgent</div>

          <div className="border p-2">{userAgent}</div>
        </div>
      )}

      {!userAgent && <div>No user agent</div>}
    </div>
  );
};
