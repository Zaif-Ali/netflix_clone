// Password must include at least one alphabet (a-zA-Z) and one number (0-9)
// and have a minimum length of 4 characters.
export  const isPasswordValid = (password: string) => {
    return (
        /[a-zA-Z]/.test(password) && /\d/.test(password) && password.length >= 4
    );
};

export function isValidEmail(email: string): boolean {
    // Regular expression for basic email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailPattern.test(email);
}