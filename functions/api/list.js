export async function onRequestPost({ request, env }) {
  const secret = env.ADMIN_SECRET;
  const db = env.DB;
  const body = await request.json();
  if (body.secret !== secret) {
    return new Response(JSON.stringify({ ok: false, msg: "密钥错误" }), {
      headers: { "Content-Type": "application/json" }
    })
  }
  const { results } = await db.prepare(`SELECT id,name,contact,content,status FROM posts ORDER BY id DESC`).all();
  return new Response(JSON.stringify({ ok: true, data: results }), {
    headers: { "Content-Type": "application/json" }
  })
}
