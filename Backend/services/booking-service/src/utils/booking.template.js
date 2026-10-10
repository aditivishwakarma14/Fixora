const wrap = (heading, lines) => `<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;background:#f4f4f7;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;">
    <div style="background:#0B0B0F;color:#facc15;font-size:22px;font-weight:700;padding:18px 24px;">Fixora</div>
    <div style="padding:24px;color:#222;line-height:1.6;">
      <h2 style="margin:0 0 12px;font-size:20px;">${heading}</h2>
      ${lines.map((line) => `<p style="margin:0 0 10px;">${line}</p>`).join("")}
      <p style="margin:20px 0 0;color:#777;font-size:13px;">Fixora, local services made simple.</p>
    </div>
  </div>
</body>
</html>`

// user content is escaped before it goes into an email
const esc = (text = "") => String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

export const bookingAcceptedTemplate = (booking) => wrap("Your request was accepted", [
    `Hi ${esc(booking.customerName)},`,
    `<b>${esc(booking.workerName)}</b> accepted your request <b>${esc(booking.title)}</b> and will contact you shortly.`,
    `You can follow it from your Fixora dashboard.`
])

export const bookingCompletedTemplate = (booking) => wrap("Your job is complete", [
    `Hi ${esc(booking.customerName)},`,
    `<b>${esc(booking.workerName)}</b> marked <b>${esc(booking.title)}</b> as completed.`,
    `Thank you for using Fixora.`
])

export const bookingCancelledTemplate = (booking) => wrap("A job was cancelled", [
    `Hi ${esc(booking.workerName)},`,
    `${esc(booking.customerName)} cancelled the job <b>${esc(booking.title)}</b>.`
])
