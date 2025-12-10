import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { Users } from "./Users";

const mockApiUsers = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    phone: "010-692-6593",
    website: "anastasia.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains",
    },
  },
];

describe("<Users />", () => {
  beforeEach(() => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockApiUsers,
    } as unknown as Response);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders users from API", async () => {
    render(<Users />);

    await waitFor(() =>
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument()
    );

    expect(screen.getByText("Ervin Howell")).toBeInTheDocument();

    const cards = screen.getAllByTestId("user-card");
    expect(cards).toHaveLength(2);
  });

  it("filters users by name when typing in the input", async () => {
    const user = userEvent.setup();
    render(<Users />);

    await waitFor(() =>
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument()
    );

    const cardsBeforeFilter = screen.getAllByTestId("user-card");
    expect(cardsBeforeFilter).toHaveLength(2);

    const input = screen.getByPlaceholderText(/filter by name/i);

    await user.type(input, "Leanne");

    const cardsAfterFilter = screen.getAllByTestId("user-card");
    expect(cardsAfterFilter).toHaveLength(1);
    expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
  });

  it("shows no results message when filter matches nothing", async () => {
    const user = userEvent.setup();
    render(<Users />);

    await waitFor(() =>
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument()
    );

    const input = screen.getByPlaceholderText(/filter by name/i);

    await user.clear(input);
    await user.type(input, "Non Existing Name");

    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });
});
