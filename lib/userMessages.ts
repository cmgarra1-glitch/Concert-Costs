export function friendlyError(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("invalid login credentials")) {
    return "That email or password did not match. Please try again.";
  }
  if (lower.includes("email not confirmed")) {
    return "Please confirm your email before logging in. Check your inbox.";
  }
  if (lower.includes("user already registered")) {
    return "An account with this email already exists. Try logging in instead.";
  }
  if (lower.includes("password") && lower.includes("least")) {
    return "Your password needs to be at least 6 characters.";
  }
  if (lower.includes("network") || lower.includes("fetch")) {
    return "Could not reach the server. Check your internet connection and try again.";
  }
  if (lower.includes("jwt") || lower.includes("session")) {
    return "Your session expired. Please log in again.";
  }
  if (lower.includes("concerts_genre_check") || lower.includes("genre")) {
    return "That genre could not be saved. Try again — any text like Rock or Jazz should work.";
  }

  return message;
}
