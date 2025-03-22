import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.MAILSLURP_API_KEY;
const BASE_URL = "https://api.mailslurp.com";
const INBOX_ID = process.env.MAILSLURP_INBOX_ID;

/**
 * Gọi API MailSlurp
 * @param {string} endpoint
 */
async function callMailSlurpAPI(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: { "x-api-key": API_KEY },
  });

  if (!response.ok) throw new Error(`❌ Lỗi API: ${response.statusText}`);
  return await response.json();
}

/**
 * Lấy danh sách email trong inbox
 */
export async function getEmails() {
  return await callMailSlurpAPI(`/inboxes/${INBOX_ID}/emails`);
}

/**
 * Lấy nội dung chi tiết của một email
 * @param {string} emailId - ID của email
 */
export async function getEmailContent(emailId) {
  return await callMailSlurpAPI(`/emails/${emailId}`);
}

/**
 * Kiểm tra email có chứa nội dung mong muốn không
 * @param {string} expectedText - Nội dung mong muốn
 */
export async function verifyEmailContainsText(expectedText) {
  const emails = await getEmails();
  if (emails.length === 0)
    throw new Error("⚠️ Không có email nào trong inbox!");

  console.log(`📩 Có ${emails.length} email, lấy email mới nhất...`);
  const sortedEmails = emails.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const latestEmail = await getEmailContent(sortedEmails[0].id);

  console.log("📩 Nội dung email:", latestEmail.body);
  if (!latestEmail.body.includes(expectedText)) {
    throw new Error(`❌ Nội dung Email không có: "${expectedText}"`);
  }
  console.log(`✅ Nội dung Email có: "${expectedText}"`);
}
