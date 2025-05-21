import usersData from '../data/users.json';

// Helper function to get the next available user ID
const getNextUserId = (users) => {
  return Math.max(...users.map(user => user.id), 0) + 1;
};

// Helper function to save users data
const saveUsersData = (users) => {
  // In a real application, this would make an API call
  // For now, we'll just update the imported data
  usersData.users = users;
};

export const registerUser = async (userData) => {
  try {
    const { email, password, name } = userData;
    
    // Check if user already exists
    const existingUser = usersData.users.find(user => user.email === email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser = {
      id: getNextUserId(usersData.users),
      email,
      password, // In a real app, this should be hashed
      name,
      role: 'user'
    };

    // Add user to the list
    usersData.users.push(newUser);
    saveUsersData(usersData.users);

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const user = usersData.users.find(
      user => user.email === email && user.password === password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
}; 