import { authConfig } from "@/lib/auth/auth-config";
import { getServerSession } from "next-auth";
import Divider from "../_components/Divider";
import Feed from "./_components/FeedCheckin";
import { Edit } from "lucide-react";

export default async function Perfil() {
  const session = await getServerSession(authConfig);
  const user = session?.user;

  return (
    <div className="space-y-4">
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {user?.name}
          </h1>
          <div>
            <p className="mt-1 text-gray-900">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <Divider titulo="Check-ins" />
        <Feed/>
      </div>
    </div>
  );
}
