const ACCESS_TOKEN_TTL = 900; //15m

export function getAccessTokenCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

function setAccessTokenCookie(access_token: string) {
  const expires = new Date();
  expires.setDate(expires.getDate() + 1);
  document.cookie = `access_token=${access_token};max-age=${ACCESS_TOKEN_TTL};path=/;SameSite=lax`;
}
