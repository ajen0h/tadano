"use server"

export const chekout = async (values: any) => {
  try {

    console.log(values);

    return { success: 'Email sent!' };
  } catch (error) {
    console.error('Registration failed:', error);
    return { error: 'Registration failed.' };
  }
};