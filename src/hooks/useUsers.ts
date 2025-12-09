import { useEffect, useState } from "react";
import type { ApiUser, User, UserStatus } from "../types/user";

const API_URL = "https://jsonplaceholder.typicode.com/users";
const ICON_URL = "https://api.dicebear.com/9.x/identicon/svg";

function mapStatus(id: number): UserStatus {
  if (id % 3 === 0) return "inactive";
  if (id % 3 === 1) return "active";
  return "pending";
}

function mapApiUserToUser(apiUser: ApiUser): User {
  return {
    id: apiUser.id,
    name: apiUser.name ?? "Unknown user",
    role: apiUser.company?.name ?? "Unknown role",
    status: mapStatus(apiUser.id),
    avatarUrl: `${ICON_URL}?seed=${encodeURIComponent(
      apiUser.username ?? String(apiUser.id)
    )}`,
  };
}

interface UseUsersResult {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

export function useUsers(): UseUsersResult {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function loadUsers() {
      try {
        setError(null);

        const res = await fetch(API_URL, { signal: controller.signal });

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data: ApiUser[] = await res.json();

        if (!isMounted) return;
        setUsers(data.map(mapApiUserToUser));
      } catch (err: unknown) {
        if (!isMounted || controller.signal.aborted) return;

        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return { users, isLoading, error };
}
