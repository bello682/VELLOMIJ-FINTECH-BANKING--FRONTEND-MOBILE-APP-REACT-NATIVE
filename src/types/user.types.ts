// First, we define what our data looks like. This is the "Blueprint.
// user.types.ts (Redux): Handles the data shape of your global state and user objects.
export interface User {
	id: string;
	email: string;
	fullName: string;
	token: string;
	isKycVerified: boolean;
}

export interface AuthState {
	user: User | null;
	isLoading: boolean;
	error: string | null;
}
