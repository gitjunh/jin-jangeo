import { GITHUB_BRANCH, GITHUB_OWNER, GITHUB_REPO, getToken } from './auth';

export interface GhFile {
  sha: string;
  content: string;
}

function contentsUrl(path: string): string {
  return `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;
}

function headers(): HeadersInit {
  const token = getToken();
  if (!token) throw new Error('GitHub 토큰이 없습니다.');
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

async function parseError(res: Response): Promise<string> {
  try {
    const body = await res.json() as { message?: string };
    return body.message ?? res.statusText;
  } catch {
    return res.statusText;
  }
}

function decodeBase64Utf8(base64: string): string {
  const binary = atob(base64.replace(/\s/g, ''));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder('utf-8').decode(bytes);
}

function encodeBase64Utf8(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!);
  return btoa(binary);
}

export async function getFile(path: string): Promise<GhFile | null> {
  const res = await fetch(`${contentsUrl(path)}?ref=${GITHUB_BRANCH}`, { headers: headers() });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(await parseError(res));
  const data = await res.json() as { sha: string; content: string };
  return { sha: data.sha, content: decodeBase64Utf8(data.content) };
}

export async function putJson(path: string, data: unknown, sha?: string): Promise<void> {
  const content = encodeBase64Utf8(JSON.stringify(data, null, 2));
  await putRaw(path, content, sha);
}

export async function putBinary(path: string, blob: Blob, sha?: string): Promise<void> {
  const buf = await blob.arrayBuffer();
  const bytes = new Uint8Array(buf);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!);
  await putRaw(path, btoa(binary), sha);
}

async function putRaw(path: string, base64Content: string, sha?: string): Promise<void> {
  const body: Record<string, string> = {
    message: `admin: update ${path}`,
    content: base64Content,
    branch: GITHUB_BRANCH,
  };
  if (sha) body.sha = sha;

  const res = await fetch(contentsUrl(path), {
    method: 'PUT',
    headers: { ...headers(), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await parseError(res));
}

export async function loadJsonFromGh<T>(path: string): Promise<{ data: T; sha: string }> {
  const file = await getFile(path);
  if (!file) throw new Error(`${path} 파일이 없습니다. 먼저 배포해 주세요.`);
  return { data: JSON.parse(file.content) as T, sha: file.sha };
}
