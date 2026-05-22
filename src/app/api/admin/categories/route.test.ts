import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  requireAdmin: vi.fn(),
  rateLimit: vi.fn(),
  validateSameOriginRequest: vi.fn(),
  prisma: {
    category: {
      create: vi.fn(),
      findMany: vi.fn(),
    },
  },
}));

vi.mock("~/lib/admin", () => ({
  requireAdmin: mocks.requireAdmin,
}));

vi.mock("~/lib/rate-limit", () => ({
  rateLimit: mocks.rateLimit,
}));

vi.mock("~/lib/csrf", () => ({
  validateSameOriginRequest: mocks.validateSameOriginRequest,
}));

vi.mock("~/lib/prisma", () => ({
  prisma: mocks.prisma,
}));

import { GET, POST } from "./route";

function createRequest(body: unknown) {
  return new Request("http://localhost:3000/api/admin/categories", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "http://localhost:3000",
    },
    body: JSON.stringify(body),
  });
}

describe("admin category collection route", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mocks.requireAdmin.mockResolvedValue({
      ok: true,
      user: {
        id: "admin-1",
        role: "ADMIN",
      },
    });

    mocks.rateLimit.mockResolvedValue({
      ok: true,
    });

    mocks.validateSameOriginRequest.mockReturnValue(null);
  });

  it("loads categories for admins", async () => {
    mocks.prisma.category.findMany.mockResolvedValue([
      {
        id: "category-1",
        name: "Figures",
        slug: "figures",
        _count: {
          products: 2,
        },
      },
    ]);

    const response = await GET();
    const body = (await response.json()) as {
      categories: Array<{ slug: string; _count: { products: number } }>;
    };

    expect(response.status).toBe(200);
    expect(body.categories[0]?.slug).toBe("figures");
    expect(body.categories[0]?._count.products).toBe(2);
  });

  it("creates a category with valid input", async () => {
    mocks.prisma.category.create.mockResolvedValue({
      id: "category-1",
      name: "Figures",
      slug: "figures",
    });

    const response = await POST(
      createRequest({
        name: "Figures",
        slug: "figures",
      }),
    );

    const body = (await response.json()) as { category: { slug: string } };

    expect(response.status).toBe(200);
    expect(body.category.slug).toBe("figures");
    expect(mocks.prisma.category.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          name: "Figures",
          slug: "figures",
        },
      }),
    );
  });

  it("rejects invalid category input", async () => {
    const response = await POST(
      createRequest({
        name: "A",
        slug: "Bad Slug!",
      }),
    );

    const body = (await response.json()) as { message: string };

    expect(response.status).toBe(400);
    expect(body.message).toBe("Invalid input.");
    expect(mocks.prisma.category.create).not.toHaveBeenCalled();
  });

  it("hides the route from non-admin users", async () => {
    const notFoundResponse = Response.json(
      {
        message: "Not found.",
      },
      { status: 404 },
    );

    mocks.requireAdmin.mockResolvedValue({
      ok: false,
      response: notFoundResponse,
    });

    const response = await GET();
    const body = (await response.json()) as { message: string };

    expect(response.status).toBe(404);
    expect(body.message).toBe("Not found.");
  });
});
