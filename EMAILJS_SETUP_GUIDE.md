# EmailJS 設定指南

本指南將協助您設定 EmailJS，讓網站表單的資料直接發送到 `contact@ifittw.com`。

## 📧 設定步驟

### 步驟 1：註冊 EmailJS 帳號

1. 前往 [https://www.emailjs.com/](https://www.emailjs.com/)
2. 點擊右上角的 **Sign Up** 註冊免費帳號
3. 使用 `contact@ifittw.com` 或您的其他電子郵件註冊
4. 驗證您的電子郵件

### 步驟 2：新增 Email Service

1. 登入後，點擊左側選單的 **Email Services**
2. 點擊 **Add New Service**
3. 選擇您使用的郵件服務商：
   - **Gmail** (如果您使用 Gmail)
   - **Outlook** (如果您使用 Outlook/Hotmail)
   - **其他** (根據您的郵件服務選擇)
4. 按照指示連接您的電子郵件帳號
5. 設定完成後，記下您的 **Service ID**（例如：`service_abc1234`）

### 步驟 3：創建 Email Template

1. 點擊左側選單的 **Email Templates**
2. 點擊 **Create New Template**
3. 設定模板內容：

#### 模板設定範例：

**Template Name:** Contact Form Submission

**Subject:** 網站聯絡表單 - {{from_name}}

**Content (Body):**
```
您收到一則來自網站的新訊息！

姓名：{{from_name}}
電話：{{from_phone}}
電子郵件：{{from_email}}
興趣：{{interest}}

訊息內容：
{{message}}

---
此郵件由網站聯絡表單自動發送
```

**To Email:** contact@ifittw.com

4. 點擊 **Save** 儲存模板
5. 記下您的 **Template ID**（例如：`template_xyz5678`）

### 步驟 4：取得 Public Key

1. 點擊左側選單的 **Account**
2. 在頁面中找到 **API Keys** 區塊
3. 複製您的 **Public Key**（例如：`AbCdEfGhIjKlMnOp`）

### 步驟 5：更新網站配置

1. 打開 `script.js` 檔案
2. 找到檔案開頭的 `EMAILJS_CONFIG` 配置
3. 將以下三個值替換為您在上述步驟中取得的值：

```javascript
const EMAILJS_CONFIG = {
    publicKey: 'AbCdEfGhIjKlMnOp',      // 替換為您的 Public Key
    serviceId: 'service_abc1234',       // 替換為您的 Service ID
    templateId: 'template_xyz5678'      // 替換為您的 Template ID
};
```

### 步驟 6：測試表單

1. 在瀏覽器中打開 `index.html`
2. 滾動到「聯絡我」區塊
3. 填寫測試資料並提交
4. 檢查 `contact@ifittw.com` 是否收到郵件

## 📊 免費方案限制

EmailJS 免費方案包含：
- ✅ 每月 200 封郵件
- ✅ 2 個 Email Services
- ✅ 2 個 Email Templates
- ✅ 所有基本功能

對於個人網站來說，免費方案完全足夠使用！

## 🔧 常見問題

### Q: 沒收到郵件怎麼辦？

1. **檢查垃圾郵件資料夾**：自動發送的郵件可能被標記為垃圾郵件
2. **驗證 Email Service**：確保在 EmailJS 後台的 Email Service 已經驗證成功
3. **檢查配置**：確認 Service ID 和 Template ID 正確無誤
4. **查看控制台**：打開瀏覽器的開發者工具 (F12)，查看 Console 是否有錯誤訊息

### Q: 如何查看已發送的郵件？

登入 EmailJS 後台，點擊左側的 **Emails** 可以查看最近發送的郵件記錄。

### Q: 可以發送到多個電子郵件嗎？

可以！在 Email Template 的 **To Email** 欄位中，用逗號分隔多個郵件地址：
```
contact@ifittw.com, backup@ifittw.com
```

### Q: 如何自訂郵件格式？

在 Email Templates 編輯頁面中，您可以：
- 使用 HTML 格式美化郵件
- 調整主旨和內容
- 添加 CC、BCC 收件者
- 添加自動回覆功能

## 📱 測試建議

建議先使用測試資料提交表單：
- 姓名：測試用戶
- 電話：0912-345-678
- 電子郵件：test@example.com
- 興趣：了解產品
- 訊息：這是一則測試訊息

確認收到郵件後，網站就可以正式上線使用了！

## 🆘 需要協助？

如果在設定過程中遇到任何問題，可以：
1. 查看 EmailJS 官方文檔：[https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
2. 檢查瀏覽器控制台的錯誤訊息
3. 確認所有配置值都正確填寫

---

設定完成後，您的網站聯絡表單就可以正常使用了！所有訪客提交的資料都會直接發送到 `contact@ifittw.com`。
