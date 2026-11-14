export async function onRequestPost({ request, env }) {
  const secret = env.ADMIN_SECRET;
  const db = env.DB;
  const body = await request.json();
  if (body.secret !== secret) {
    return new Response(JSON.stringify({ ok: false, msg: "密钥错误" }), {
      headers: { "Content-Type": "application/json" }
    })
  }
  const { id, action } = body;
  let status;
  if (action === "pass") status = "passed";
  else if (action === "reject") status = "rejected";
  else {
    return new Response(JSON.stringify({ ok: false, msg: "非法操作" }), {
      headers: { "Content-Type": "application/json" }
    })
  }
  await db.prepare(`UPDATE posts SET status = ? WHERE id = ?`)
    .bind(status, id)
    .run();
  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" }
  })
}
