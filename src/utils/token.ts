export function getJwtExpMs(token: string | null): number | null {
  if (!token) return null;
  try {
    const [, payload] = token.split(".");
    const { exp } = JSON.parse(atob(payload));
    return typeof exp === "number" ? exp * 1000 : null;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string | null): boolean {
  const expMs = getJwtExpMs(token);
  return !expMs || Date.now() >= expMs;
}
