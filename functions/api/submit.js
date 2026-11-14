export async function onRequestPost({ request, env }) {
  const secret = env.ADMIN_SECRET;
  const db = env.DB;
  const body = await request.json();
  const { name, contact, content } = body;
  if (!name || !content) {
    return new Response(JSON.stringify({ ok: false, msg: "昵称和正文不能为空" }), {
      headers: { "Content-Type": "application/json" }
    })
  }
  await db.prepare(`INSERT INTO posts (name, contact, content, status) VALUES (?, ?, ?, 'pending')`)
    .bind(name, contact || "", content)
    .run();
  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" }
  })
}
