# Redux ToDoApp

<p align="center">
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
</p>

---

## 🧑‍💻Ngôn ngữ sử dụng trong mã nguồn

![image1](image1)

- **TypeScript:** 96.7%
- **JavaScript:** 2.2%
- **HTML:** 1.1%

---

## 📝 Mô tả Ứng Dụng

**Redux ToDoApp** là ứng dụng quản lý công việc cá nhân (To-Do List) được xây dựng hiện đại với React, Redux và TypeScript, sử dụng Vite làm công cụ phát triển.  
Ứng dụng cho phép bạn:

- Thêm, sửa, xóa các công việc cần làm.
- Đánh dấu công việc đã hoàn thành hoặc chưa hoàn thành.
- Lọc danh sách công việc theo trạng thái (tất cả, đã hoàn thành, chưa hoàn thành).
- Quản lý trạng thái toàn bộ ứng dụng với Redux để đảm bảo hoạt động ổn định, dễ dàng mở rộng và bảo trì.
- Trải nghiệm hiệu năng cao nhờ Vite và TypeScript.

Sản phẩm hướng đến việc giúp bạn nắm vững kiến thức về Redux thông qua thực hành thực tế, đồng thời là mẫu code tham khảo tiêu chuẩn cho các dự án quản lý state phức tạp.

---

## 🛠️ Công Nghệ Sử Dụng

- ![Redux](https://img.shields.io/badge/-Redux-764ABC?logo=redux&logoColor=white) **Redux** - Quản lý trạng thái ứng dụng.
- ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) **Vite** - Công cụ build và môi trường phát triển siêu nhanh.
- ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) **TypeScript** - Ngôn ngữ lập trình bổ sung kiểu tĩnh cho JavaScript.
- ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black) **JavaScript** - Ngôn ngữ lập trình nền tảng web.
- ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white) **HTML5** - Đánh dấu cấu trúc cho ứng dụng.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

1. **Clone dự án về máy:**
   ```bash
   git clone https://github.com/quangcaptain26-3/Redux-ToDoApp.git
   cd Redux-ToDoApp
   ```

2. **Cài đặt dependencies:**
   ```bash
   # Sử dụng npm
   npm install

   # Hoặc sử dụng yarn
   yarn install

   # Hoặc pnpm
   pnpm install
   ```

3. **Chạy ứng dụng ở mode phát triển (development) với Vite:**
   ```bash
   # Sử dụng npm
   npm run dev

   # Sử dụng yarn
   yarn dev

   # Sử dụng pnpm
   pnpm dev
   ```

4. **Build ứng dụng cho production:**
   ```bash
   # Sử dụng npm
   npm run build

   # Sử dụng yarn
   yarn build

   # Sử dụng pnpm
   pnpm build
   ```

5. **Preview production build:**
   ```bash
   # Sử dụng npm
   npm run preview

   # Sử dụng yarn
   yarn preview

   # Sử dụng pnpm
   pnpm preview
   ```

---

## 📚 Lý Thuyết Về Redux

### Redux là gì?

Redux là thư viện quản lý trạng thái (state management) phổ biến nhất cho các ứng dụng JavaScript lớn, đặc biệt khi sử dụng với React. Redux giúp lưu trữ trạng thái toàn bộ ứng dụng trong một "store" duy nhất, giúp kiểm soát, debug và đồng bộ dữ liệu dễ dàng hơn.

### Ba nguyên lý cốt lõi của Redux

1. **Single Source of Truth**  
   Toàn bộ state của ứng dụng được lưu trữ trong một object duy nhất (store).

2. **State chỉ đọc (Read-only State)**  
   State chỉ có thể thay đổi khi một action được gửi đến (dispatch).

3. **Reducer là pure function**  
   Thay đổi state bằng các reducer (hàm thuần), nhận state cũ và action, trả về state mới.

### Các thành phần chính trong Redux

- **Store**: Nơi lưu tất cả state của ứng dụng.
- **Action**: Một object mô tả sự kiện/ý định thay đổi state.
- **Reducer**: Hàm xử lý logic chuyển đổi state dựa trên action.
- **Dispatch**: Hàm gửi action tới reducer.
- **Selector**: Lấy dữ liệu từ state.
- **Middleware**: Xử lý logic trung gian (ví dụ: async, logger...).

### Quy trình hoạt động của Redux

```mermaid
sequenceDiagram
    participant UI
    participant Store
    participant Reducer
    UI->>Store: dispatch(action)
    Store->>Reducer: Gửi action và state hiện tại
    Reducer->>Store: Trả về state mới
    Store->>UI: UI re-render với state mới
```

### Ví dụ cơ bản về Redux

```typescript
// actions.ts
export const addTodo = (text: string) => ({
  type: 'ADD_TODO',
  payload: text
});

// reducer.ts
type State = { todos: string[] };
const initialState: State = { todos: [] };

function todoReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'ADD_TODO':
      return { todos: [...state.todos, action.payload] };
    default:
      return state;
  }
}

// store.ts
import { createStore } from 'redux';
const store = createStore(todoReducer);
```

### Redux Toolkit

Redux Toolkit là bộ công cụ giúp setup và viết Redux dễ dàng, giảm code trùng lặp.

#### Một ví dụ với Redux Toolkit

```typescript
import { configureStore, createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [] as string[],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    }
  }
});

export const { addTodo } = todoSlice.actions;

const store = configureStore({
  reducer: {
    todos: todoSlice.reducer
  }
});
```

---

## 🧑‍💼 Liên hệ & Kết nối

- [LinkedIn: Minh Quang](https://www.linkedin.com/in/minhquang2604)

---

## 📄 License

MIT

---

> Nếu bạn thấy dự án hữu ích, hãy ⭐️ repo này nhé!
