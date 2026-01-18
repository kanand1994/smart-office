const MOCK_DELAY = 800;

export const loginApi = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "jane.doe@company.com" && password === "password123") {
        resolve({
          status: 200,
          data: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake-token-signature",
            user: {
              id: 101, name: "Jane Doe", email: email,
              role: "Software Engineer", department: "IT",
              avatar: "https://i.pravatar.cc/150?u=jane"
            }
          }
        });
      } else {
        reject({ response: { data: { message: "Invalid email or password" } } });
      }
    }, MOCK_DELAY);
  });
};

export const fetchProfileApi = async (token) => {
  await new Promise(r => setTimeout(r, MOCK_DELAY));
  if (!token) throw new Error("Unauthorized");
  return JSON.parse(localStorage.getItem('user'));
};

export const fetchAttendanceApi = async (token) => {
  await new Promise(r => setTimeout(r, MOCK_DELAY));
  if (!token) throw new Error("Unauthorized");
  return [
    { date: "2023-10-01", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "Present" },
    { date: "2023-10-02", checkIn: "09:15 AM", checkOut: "06:30 PM", status: "Present" }
  ];
};

export const fetchTasksApi = async (token) => {
  await new Promise(r => setTimeout(r, MOCK_DELAY));
  if (!token) throw new Error("Unauthorized");
  return [
    { id: 1, title: "Update Employee Portal", status: "In Progress", priority: "High" }
  ];
};