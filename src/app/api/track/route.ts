import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── Types ──
interface TrackPayload {
  event: "chatbot_opened" | "salary_query" | "salary_email_submitted";
  visitorEmail?: string;
  question?: string;
  userAgent?: string;
  page?: string;
  timestamp?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: TrackPayload = await req.json();
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const userAgent =
      body.userAgent || req.headers.get("user-agent") || "unknown";
    const timestamp = body.timestamp || new Date().toISOString();

    // ── Build email based on event ──
    let subject = "";
    let html = "";

    if (body.event === "chatbot_opened") {
      subject = "🤖 Someone opened your portfolio chatbot!";
      html = buildOpenedEmail({ ip, userAgent, timestamp });
    } else if (body.event === "salary_query") {
      subject = "💰 Someone asked about your salary — email gate triggered";
      html = buildSalaryQueryEmail({ ip, userAgent, timestamp, question: body.question });
    } else if (body.event === "salary_email_submitted") {
      subject = `📬 Recruiter email captured: ${body.visitorEmail}`;
      html = buildEmailCapturedEmail({
        ip,
        userAgent,
        timestamp,
        visitorEmail: body.visitorEmail!,
        question: body.question,
      });
    }

    // ── Send via Gmail SMTP (Nodemailer) — no template ID needed ──
    if (subject) {
      await sendEmail({ subject, html });
    }

    // Always log to Vercel console as backup
    console.log(`[TRACKER] ${body.event}`, {
      ip,
      visitorEmail: body.visitorEmail,
      question: body.question,
      timestamp,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[TRACKER] Error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// ── Nodemailer Gmail SMTP sender ──
// .env.local needs only 2 vars:
//   GMAIL_USER=vishalyadav7171@gmail.com
//   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   (16-char Gmail App Password)
async function sendEmail({ subject, html }: { subject: string; html: string }) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.log(
      "[TRACKER] Gmail not configured — add GMAIL_USER and GMAIL_APP_PASSWORD to .env.local"
    );
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Vishal Portfolio Bot" <${user}>`,
    to: user, // sends to yourself
    subject,
    html,
  });
}

// ── Email HTML templates — all defined here, no external service needed ──

function buildOpenedEmail({
  ip,
  userAgent,
  timestamp,
}: {
  ip: string;
  userAgent: string;
  timestamp: string;
}) {
  return baseTemplate({
    accentColor: "#00D4FF",
    icon: "🤖",
    title: "Chatbot Opened",
    intro: "Someone just opened your AI portfolio chatbot.",
    rows: [
      { label: "Time", value: formatTime(timestamp) },
      { label: "IP", value: ip },
      { label: "Browser", value: userAgent.substring(0, 120) },
    ],
  });
}

function buildSalaryQueryEmail({
  ip,
  userAgent,
  timestamp,
  question,
}: {
  ip: string;
  userAgent: string;
  timestamp: string;
  question?: string;
}) {
  return baseTemplate({
    accentColor: "#FFB347",
    icon: "💰",
    title: "Salary Question Asked",
    intro: "Someone asked about your salary and was shown the email gate.",
    rows: [
      { label: "Question", value: `"${question || "salary related"}"`, highlight: true },
      { label: "Time", value: formatTime(timestamp) },
      { label: "IP", value: ip },
      { label: "Browser", value: userAgent.substring(0, 120) },
    ],
  });
}

function buildEmailCapturedEmail({
  ip,
  userAgent,
  timestamp,
  visitorEmail,
  question,
}: {
  ip: string;
  userAgent: string;
  timestamp: string;
  visitorEmail: string;
  question?: string;
}) {
  return baseTemplate({
    accentColor: "#00D4FF",
    icon: "📬",
    title: "Recruiter Email Captured!",
    intro: "A recruiter gave their email to unlock your salary details.",
    highlight: visitorEmail,
    rows: [
      { label: "Their Email", value: visitorEmail, highlight: true },
      { label: "Question", value: `"${question || "salary related"}"` },
      { label: "Time", value: formatTime(timestamp) },
      { label: "IP", value: ip },
      { label: "Browser", value: userAgent.substring(0, 120) },
    ],
    footer: "💡 Reply directly to their email — they're actively hiring!",
  });
}

// ── Shared base template ──
function baseTemplate({
  accentColor,
  icon,
  title,
  intro,
  rows,
  highlight,
  footer,
}: {
  accentColor: string;
  icon: string;
  title: string;
  intro: string;
  rows: { label: string; value: string; highlight?: boolean }[];
  highlight?: string;
  footer?: string;
}) {
  const rowsHtml = rows
    .map(
      (r) => `
      <tr>
        <td style="padding:10px 12px;color:#64748b;font-size:13px;white-space:nowrap;vertical-align:top;">${r.label}</td>
        <td style="padding:10px 12px;font-size:13px;color:${r.highlight ? accentColor : "#e2e8f0"};word-break:break-word;">${r.value}</td>
      </tr>`
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#0d1117;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      <div style="max-width:540px;margin:32px auto;background:#0A1018;border-radius:16px;border:1px solid ${accentColor}30;overflow:hidden;">

        <!-- Header -->
        <div style="background:linear-gradient(135deg,${accentColor}20,#7B2FFF20);padding:28px 28px 20px;border-bottom:1px solid ${accentColor}20;">
          <div style="font-size:32px;margin-bottom:10px;">${icon}</div>
          <h1 style="margin:0;color:${accentColor};font-size:20px;font-weight:700;">${title}</h1>
          <p style="margin:8px 0 0;color:#94a3b8;font-size:14px;">${intro}</p>
        </div>

        ${
          highlight
            ? `<!-- Highlighted value -->
        <div style="margin:20px 24px 0;background:${accentColor}15;border:1px solid ${accentColor}40;border-radius:10px;padding:16px;">
          <p style="margin:0;font-size:20px;font-weight:700;color:${accentColor};">${highlight}</p>
        </div>`
            : ""
        }

        <!-- Data table -->
        <div style="padding:16px 12px 8px;">
          <table style="width:100%;border-collapse:collapse;">
            ${rowsHtml}
          </table>
        </div>

        ${
          footer
            ? `<!-- Footer note -->
        <div style="padding:0 24px 24px;">
          <p style="margin:0;color:#94a3b8;font-size:13px;background:#ffffff08;padding:12px 16px;border-radius:8px;">${footer}</p>
        </div>`
            : "<div style='height:16px'></div>"
        }

        <!-- Branding -->
        <div style="padding:16px 24px;border-top:1px solid #ffffff10;text-align:center;">
          <p style="margin:0;font-size:11px;color:#475569;">
            Sent by <strong style="color:${accentColor}">Vishal Yadav's AI Portfolio</strong> · vishal-portfolio-neon.vercel.app
          </p>
        </div>

      </div>
    </body>
    </html>`;
}

function formatTime(timestamp: string) {
  return new Date(timestamp).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  }) + " IST";
}
