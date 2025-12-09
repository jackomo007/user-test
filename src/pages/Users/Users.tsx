import React, { useMemo, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { UserCard } from "../../components/UserCard";
import "./Users.css";

export const Users: React.FC = () => {
  const { users, isLoading, error } = useUsers();
  const [filter, setFilter] = useState("");
  const [variant, setVariant] = useState<"compact" | "full">("full");

  const filteredUsers = useMemo(() => {
    const normalized = filter.trim().toLowerCase();
    if (!normalized) return users;
    return users.filter((user) => user.name.toLowerCase().includes(normalized));
  }, [users, filter]);

  return (
    <main className="users-page">
      <header className="users-page__header">
        <div>
          <h1 className="users-page__title">Users</h1>
          <p className="users-page__subtitle">
            Filter and browse users from a public API.
          </p>
        </div>

        <div className="users-page__controls">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="users-page__filter-input"
            placeholder="Filter by name..."
            aria-label="Filter users by name"
          />

          <div className="users-page__variant-toggle" aria-label="Layout">
            <button
              type="button"
              className={variant === "full" ? "is-active" : ""}
              onClick={() => setVariant("full")}
            >
              Full
            </button>
            <button
              type="button"
              className={variant === "compact" ? "is-active" : ""}
              onClick={() => setVariant("compact")}
            >
              Compact
            </button>
          </div>
        </div>
      </header>

      {isLoading && <p className="users-page__state">Loading users...</p>}
      {error && (
        <p className="users-page__state users-page__state--error">
          Failed to load users: {error}
        </p>
      )}

      {!isLoading && !error && filteredUsers.length === 0 && (
        <p className="users-page__state">No users match your filter.</p>
      )}

      <section className="users-page__grid" aria-label="Users list">
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            name={user.name}
            role={user.role}
            status={user.status}
            avatarUrl={user.avatarUrl}
            variant={variant}
          />
        ))}
      </section>
    </main>
  );
};
