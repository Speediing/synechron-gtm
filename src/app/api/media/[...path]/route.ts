import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createReadStream, existsSync, statSync } from "fs";
import { join, normalize } from "path";
import { Readable } from "stream";
import { AUTH_COOKIE, isValidSession } from "@/lib/auth";

type Params = { params: Promise<{ path: string[] }> };

export async function GET(_request: Request, { params }: Params) {
  const jar = await cookies();
  if (!(await isValidSession(jar.get(AUTH_COOKIE)?.value))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const segments = (await params).path || [];
  if (segments.some((part) => part === ".." || part.includes("\0"))) {
    return NextResponse.json({ error: "Bad path" }, { status: 400 });
  }

  const relative = normalize(segments.join("/"));
  if (relative.startsWith("..") || relative.startsWith("/")) {
    return NextResponse.json({ error: "Bad path" }, { status: 400 });
  }

  const root = join(process.cwd(), "private", "media");
  const absolute = join(root, relative);
  if (!absolute.startsWith(root)) {
    return NextResponse.json({ error: "Bad path" }, { status: 400 });
  }
  if (!existsSync(absolute)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const stat = statSync(absolute);
  const nodeStream = createReadStream(absolute);
  const webStream = Readable.toWeb(nodeStream) as unknown as ReadableStream;

  return new NextResponse(webStream, {
    headers: {
      "content-type": "video/mp4",
      "content-length": String(stat.size),
      "cache-control": "private, max-age=3600",
    },
  });
}
