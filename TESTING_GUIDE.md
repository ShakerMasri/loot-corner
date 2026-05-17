# Unit Testing Guide - Loot Corner

Your project is now ready for unit testing with **Vitest** + **React Testing Library**.

## Quick Start

```bash
# Run tests once
npm run test:run

# Watch mode (re-run on changes)
npm test

# Generate coverage report
npm run test:coverage
```

---

## Test Patterns for Your Project

### 1. **React Component Tests**

Test components in `src/components/**/*.test.tsx`

**Example: Form Component**

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  it("renders email and password inputs", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={vi.fn()} />);

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /login/i }));

    // Assert submission was called
  });

  it("shows validation errors", async () => {
    render(<LoginForm />);
    await userEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });
});
```

### 2. **Utility Function Tests**

Test functions in `src/lib/**/*.test.ts`

**Example: Validation**

```typescript
import { describe, it, expect } from "vitest";
import { validateEmail, validatePassword } from "./validations";

describe("Email Validation", () => {
  it("accepts valid emails", () => {
    expect(validateEmail("user@example.com")).toBe(true);
    expect(validateEmail("test.name+tag@domain.co.uk")).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(validateEmail("invalid")).toBe(false);
    expect(validateEmail("@example.com")).toBe(false);
  });
});

describe("Password Validation", () => {
  it("requires minimum 8 characters", () => {
    expect(validatePassword("short")).toBe(false);
    expect(validatePassword("longpassword123")).toBe(true);
  });
});
```

### 3. **API Route Tests**

Test routes in `src/app/api/**/*.test.ts` using Supertest

**Example: Products API**

```typescript
import { describe, it, expect } from "vitest";
import request from "supertest";

describe("GET /api/products", () => {
  it("returns list of products", async () => {
    const response = await request(app).get("/api/products").expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("price");
  });

  it("filters by category", async () => {
    const response = await request(app)
      .get("/api/products?category=electronics")
      .expect(200);

    expect(response.body.every((p) => p.category === "electronics")).toBe(true);
  });

  it("paginates results", async () => {
    const response = await request(app)
      .get("/api/products?skip=0&take=10")
      .expect(200);

    expect(response.body.length).toBeLessThanOrEqual(10);
  });

  it("returns 400 for invalid pagination", async () => {
    await request(app).get("/api/products?skip=-1").expect(400);
  });
});
```

### 4. **Mocking Patterns**

**Mock external modules:**

```typescript
import { vi } from "vitest";

// Mock API calls
vi.mock("~/lib/auth", () => ({
  getSession: vi.fn(() => Promise.resolve({ user: { id: "1" } })),
}));

// Mock Next.js router
vi.mock("next/router", () => ({
  useRouter: () => ({
    push: vi.fn(),
    pathname: "/",
    query: {},
  }),
}));
```

### 5. **User Interaction Tests**

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("AddToCartControls", () => {
  it("increments quantity on button click", async () => {
    const user = userEvent.setup();
    render(<AddToCartControls productId="1" />);

    const increment = screen.getByRole("button", { name: /\+/ });
    await user.click(increment);

    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
  });
});
```

---

## What to Test

### ✅ **Always Test:**

- Input validation (emails, numbers, dates)
- Error states and edge cases
- User interactions (clicks, form submissions)
- Critical business logic
- API responses and error handling

### ❌ **Don't Over-Test:**

- Implementation details (test behavior, not internals)
- Third-party library code (they have their own tests)
- Trivial getters/setters
- UI only (test functionality instead)

---

## File Organization

```
src/
├── components/
│   ├── LoginForm.tsx
│   └── LoginForm.test.tsx
├── lib/
│   ├── validations.ts
│   └── validations.test.ts
├── app/api/
│   ├── products/
│   │   ├── route.ts
│   │   └── products.test.ts
```

---

## Coverage Report

After running `npm run test:coverage`, open `coverage/index.html` in your browser to see:

- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

**Target:** 70%+ coverage for critical paths

---

## Common Assertions

```typescript
// Existence
expect(element).toBeInTheDocument();
expect(element).toBeVisible();

// Text content
expect(screen.getByText("Hello")).toBeInTheDocument();

// Form inputs
expect(input).toHaveValue("test@example.com");
expect(input).toHaveAttribute("type", "email");

// Classes & styles
expect(element).toHaveClass("active");

// Numbers
expect(array).toHaveLength(5);
expect(value).toBeGreaterThan(10);

// Objects
expect(obj).toHaveProperty("id");
expect(obj).toEqual({ id: 1, name: "Test" });
```

---

## Useful Commands

```bash
# Run specific test file
npm run test:run src/lib/validations.test.ts

# Run tests matching pattern
npm run test:run -- --grep "LoginForm"

# Update snapshots
npm run test:run -- -u

# Watch mode with UI
npm test -- --ui
```

---

## Next Steps

1. Write tests for your **validation functions** first (easiest to test)
2. Add tests for **API routes** (use mocks for database)
3. Add tests for **React components** (use user interactions)
4. Aim for **70%+ coverage** on critical features
5. Run tests in **CI/CD pipeline** before deployment

Happy testing! 🧪
