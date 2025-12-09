import React from "react";
import type { UserStatus } from "../../types/user";
import "./UserCard.css";

export type UserCardVariant = "compact" | "full";

export interface UserCardProps {
  name?: string;
  role?: string;
  status?: UserStatus;
  avatarUrl?: string;
  variant?: UserCardVariant;
}

const statusLabel: Record<UserStatus, string> = {
  active: "Active",
  inactive: "Inactive",
  pending: "Pending",
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const UserCard: React.FC<UserCardProps> = ({
  name = "Unknown User",
  role = "No role",
  status = "inactive",
  avatarUrl = "",
  variant = "full",
}) => {
  const safeName = name.trim() || "Unknown User";
  const safeRole = role.trim() || "No role";
  const safeStatus = statusLabel[status] ? status : "inactive";
  const safeAvatar =
    avatarUrl && isValidUrl(avatarUrl) ? avatarUrl : "/default-avatar.png";

  const safeVariant: UserCardVariant =
    variant === "compact" || variant === "full" ? variant : "full";

  return (
    <article
      className={`user-card user-card--${safeVariant}`}
      data-testid="user-card"
    >
      <div className="user-card__header">
        <img
          src={safeAvatar}
          alt={`${safeName} avatar`}
          className="user-card__avatar"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/default-avatar.png";
          }}
        />

        <div className="user-card__meta">
          <h2 className="user-card__name">{safeName}</h2>
          <p className="user-card__role">{safeRole}</p>
        </div>

        <span className={`user-card__status user-card__status--${safeStatus}`}>
          {statusLabel[safeStatus]}
        </span>
      </div>

      {safeVariant === "full" && (
        <div className="user-card__body">
          <p className="user-card__description">
            User card description designed to be used in different layouts
            across the app.
          </p>
        </div>
      )}
    </article>
  );
};
