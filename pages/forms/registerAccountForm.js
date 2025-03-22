import Register from "../../data/registerAccount.js";
import fs from "fs";

class RegisterAccountForm {
  constructor(page) {
    this.filePath = "data/registerSaveAccount.json";
    this.page = page;
    this.fields = {
      firstName: page.getByRole("textbox", { name: "* First Name" }),
      lastName: page.getByRole("textbox", { name: "* Last Name" }),
      email: page.getByRole("textbox", { name: "* E-Mail" }),
      password: page.getByRole("textbox", { name: "* Password" }),
    };
  }

  async fillFullRegisterAccountAndSave() {
    const register = new Register();

    // Điền thông tin vào form bằng cách lặp qua các field
    for (const key in this.fields) {
      await this.fields[key].fill(register[key]);
    }
    console.log("Register account data: ", register);

    this.appendToFile(register); // Lưu dữ liệu đăng ký vào file JSON
  }

  appendToFile(register) {
    // Kiểm tra file JSON có tồn tại không, nếu có thì đọc nội dung
    const data = fs.existsSync(this.filePath)
      ? JSON.parse(fs.readFileSync(this.filePath, "utf-8") || "[]") // Nếu file rỗng thì thay bằng []
      : [];

    // Thêm thông tin đăng ký mới kèm timestamp
    data.push({
      ...register, // Copy toàn bộ thông tin từ register
      createdAt: new Date().toISOString(), // Thêm timestamp thời gian tạo
    });

    // Ghi toàn bộ dữ liệu vào file JSON (giữ dữ liệu cũ, chỉ thêm mới)
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), "utf-8");
  }
}

export default RegisterAccountForm;
