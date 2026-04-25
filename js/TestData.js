class TestData {
    constructor() {
      this.baseURL = 'https://automationexercise.com';
      this.users = [
        { email: 'admin@test.com', password: 'Admin@123', role: 'admin' },
        { email: 'user@test.com',  password: 'User@123',  role: 'user'  },
        { email: 'guest@test.com', password: 'Guest@123', role: 'guest' },
      ];
    }
  
    getAdminUser() {
      return this.users.find(u => u.role === 'admin');
    }
  
    addUser(user) {
      this.users.push(user);
      console.log(`✅ Đã thêm: ${user.email}`);
    }
  }
  
  const data = new TestData();
  console.log(data.getAdminUser());
  // → { email: 'admin@test.com', password: 'Admin@123', role: 'admin' }
  data.addUser({ email: 'new@test.com', password: 'New@123', role: 'user' });
  console.log(data.users.length);  // → 4