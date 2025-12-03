"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useCounterStore } from "../store/useCounterStore";

export default function Home_login() {
  const { count, increase, decrease, reset } = useCounterStore();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main aria-busy="true">
        <p role="status" aria-live="polite">
          Loading your session…
        </p>
      </main>
    );
  }

  if (!session) {
    return (
      <main aria-labelledby="page-title">
        <h1 id="page-title">Welcome</h1>
        <p>You are not signed in.</p>
        <button
          type="button"
          onClick={() => signIn("google")}
          aria-label="Sign in with your Google account"
        >
          Sign in with Google
        </button>
      </main>
    );
  }

  return (
    <main aria-labelledby="page-title">
      <h1 id="page-title">Home</h1>

      <section aria-labelledby="user-info-heading">
        <h2 id="user-info-heading">User information</h2>
        <p>
          Signed in as:{" "}
          <span>{session.user?.email ?? "Unknown user"}</span>
        </p>
        <button
          type="button"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </section>

      <section
        aria-labelledby="counter-heading"
        style={{ marginTop: "1.5rem" }}
      >
        <h2 id="counter-heading">Counter</h2>

        {/* aria-live so screen readers announce changes */}
        <p aria-live="polite" role="status">
          Current count: <span>{count}</span>
        </p>

        <div>
          <button
            type="button"
            onClick={increase}
            aria-label="Increase counter value"
          >
            +
          </button>
          <button
            type="button"
            onClick={decrease}
            aria-label="Decrease counter value"
          >
            −
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label="Reset counter value to zero"
          >
            Reset
          </button>
        </div>
      </section>
    </main>
  );
}
